import { parse } from 'dotenv';
import cli from 'cli-ux';

import loadFile from '../utils/load-file';
import { log, logError } from '../utils/logger';
import {
  dangerColor,
  infoColor,
  successColor,
  textBold
} from '../utils/colors';
import api from '../utils/api';
import saveFile from '../utils/save-file';

type argsTypes = {
  flags: {
    noAdd?: boolean;
    noRemove?: boolean;
    noUpdateNowJson?: boolean;
  };
};

const commandUpdate = async ({ flags }: argsTypes): Promise<void> => {
  const packageJson = JSON.parse(
    (await loadFile('package.json', false)) || '{}'
  );
  if (!packageJson.now_secrets) packageJson.now_secrets = {};

  const vercelJson = await loadFile('vercel.json', false);
  const nowJson = JSON.parse(
    vercelJson || (await loadFile('now.json', false)) || '{}'
  );
  if (Object.keys(nowJson).length <= 0) {
    throw new Error(`${textBold('vercel.json')} is not found`);
  }

  if (!nowJson.env) nowJson.env = {};

  const prefix = (
    packageJson.now_secrets.prefix ||
    nowJson.name ||
    packageJson.name
  ).toLowerCase();

  if (!prefix) {
    logError(`${dangerColor('ERROR!')} Project name can't be detected.`);
    logError('To continue, you need one of the following:');
    logError('- now_secrets.prefix in package.json');
    logError('- name in vercel.json');
    logError('- name in package.json');
    throw new Error("Project name can't be detected");
  }

  const envFileName = packageJson.now_secrets.env_file_name || `.env`;
  const envs = parse(await loadFile(envFileName));

  const token = envs.VERCEL_TOKEN || envs.ZEIT_TOKEN;
  if (!token) {
    throw new Error(
      `${textBold('VERCEL_TOKEN')} is not found in ${envFileName}`
    );
  }
  delete envs.VERCEL_TOKEN;
  delete envs.ZEIT_TOKEN;

  let teamId = '';
  if (nowJson.scope) {
    try {
      const { id } = await api({
        path: 'v1/teams',
        data: { slug: nowJson.scope }
      });
      log(`Using ${textBold(nowJson.scope)}`);
      teamId = id;
    } catch (error) {
      // 404: team slug is not found
      if (error.response.status !== 404) {
        throw new Error(error);
      }
      log(`${textBold(nowJson.scope)} is a personal account`);
    }
  }

  const {
    secrets
  }: {
    secrets: Array<{
      name: string;
    }>;
  } = await api({ path: 'v2/now/secrets', teamId });
  const projectSecrets = secrets.filter(
    secret => secret.name.indexOf(`${prefix}_`) === 0
  );

  if (Object.keys(envs)[0] && !flags.noAdd) {
    log(
      successColor(
        'Add: ' +
          Object.keys(envs)
            .map(env => `@${prefix}_${env.toLowerCase()}`)
            .join(', ')
      )
    );
  }
  if (projectSecrets[0] && !flags.noRemove) {
    log(
      dangerColor(
        'Remove: ' +
          projectSecrets.map(env => textBold(`@${env.name}`)).join(', ')
      )
    );
  }

  if (!(await cli.confirm('Are you sure?'))) {
    throw new Error('User aborted');
  }

  if (projectSecrets[0] && !flags.noRemove) {
    log(infoColor('Removing secrets...'));
    const removePromises = projectSecrets.map(env => {
      const envName = Object.keys(nowJson.env).find(
        envName => nowJson.env[envName] === env.name
      );
      if (envName) {
        delete nowJson.env[envName];
      }

      return api({
        path: `v2/now/secrets/${env.name}`,
        method: 'DELETE',
        teamId
      });
    });
    await Promise.all(removePromises);
  }

  if (Object.keys(envs)[0] && !flags.noAdd) {
    log(infoColor('Adding secrets...'));
    const addPromises = Object.keys(envs).map(name => {
      const zeitEnvName = `${prefix}_${name.toLowerCase()}`;
      nowJson.env[name] = `@${zeitEnvName}`;
      return api({
        path: `v2/now/secrets`,
        method: 'POST',
        data: {
          name: zeitEnvName,
          value: envs[name]
        },
        teamId
      });
    });
    await Promise.all(addPromises);
  }

  if (!flags.noUpdateNowJson) {
    const json = JSON.stringify(nowJson, null, 2);
    await saveFile(vercelJson ? 'vercel.json' : 'now.json', json);
  }

  log(successColor('All processes were successful!✨'));
};

export default commandUpdate;
