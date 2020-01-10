import { parse } from 'dotenv';
import cli from 'cli-ux';

import loadFile from './utils/load-file';
import { log, logError } from './utils/logger';
import { dangerColor, infoColor, successColor, textBold } from './utils/colors';
import api from './utils/api';
import argvScanner from './utils/argv-scanner';
import saveFile from './utils/save-file';

const run = async () => {
  const query = argvScanner();
  const packageJsonRaw = await loadFile('package.json').catch(() => void 0);
  const packageJson = packageJsonRaw ? JSON.parse(packageJsonRaw) : {};
  if (!packageJson.now_secrets) packageJson.now_secrets = {};

  const nowJson = JSON.parse(await loadFile('now.json'));
  if (!nowJson.env) nowJson.env = {};

  let prefix;
  try {
    prefix = (
      packageJson.now_secrets.prefix ||
      nowJson.name ||
      packageJson.name
    ).toLowerCase();
  } catch (e) {
    logError(e);
  }

  if (!prefix) {
    logError(`${dangerColor('ERROR!')} Project name can't be detected.`);
    logError('To continue, you need one of the following:');
    logError('- now_secrets.prefix in package.json');
    logError('- name in now.json');
    logError('- name in package.json');
    throw new Error("Project name can't be detected");
  }

  const envFileName = packageJson.now_secrets.env_file_name || `.env`;
  const envs = parse(await loadFile(envFileName));

  if (!envs.ZEIT_TOKEN) {
    logError(
      `${dangerColor('ERROR!')} ${textBold(
        'ZEIT_TOKEN'
      )} is not found in ${envFileName}`
    );
    throw new Error('ZEIT_TOKEN is not found');
  }
  const token = envs.ZEIT_TOKEN;
  delete envs.ZEIT_TOKEN;

  let teamId;
  if (nowJson.scope) {
    try {
      const { id } = await api({
        path: 'v1/teams',
        data: { slug: nowJson.scope },
        token
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

  const { secrets } = await api({ path: 'v2/now/secrets', teamId, token });
  const projectSecrets = secrets.filter(
    secret => secret.name.indexOf(`${prefix}_`) === 0
  );

  if (Object.keys(envs)[0] && !query.noAdd) {
    log(
      successColor(
        'Add: ' +
          Object.keys(envs)
            .map(env => `@${prefix}_${env.toLowerCase()}`)
            .join(', ')
      )
    );
  }
  if (projectSecrets[0] && !query.noRemove) {
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

  if (projectSecrets[0] && !query.noRemove) {
    log(infoColor('Removing envs...'));
    const removePromises = projectSecrets.map(env => {
      const envName = Object.keys(nowJson.env).find(
        envName => nowJson.env[envName] === env.name
      );
      delete nowJson.env[envName];

      return api({
        path: `v2/now/secrets/${env.name}`,
        method: 'DELETE',
        teamId,
        token
      });
    });
    await Promise.all(removePromises);
  }

  if (Object.keys(envs)[0] && !query.noAdd) {
    log(infoColor('Adding envs...'));
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
        teamId,
        token
      });
    });
    await Promise.all(addPromises);
  }

  if (!query.noUpdateNowJson) {
    const json = JSON.stringify(nowJson, null, 2);
    await saveFile('now.json', json);
  }

  log(successColor('All processes were successful!✨'));
};

run().catch(console.error);
