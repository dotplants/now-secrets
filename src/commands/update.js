import { Command } from '@oclif/command';
import { parse } from 'dotenv';
import loadFile from '../utils/load-file';
import { logError } from '../utils/logger';
import { dangerColor, textBold } from '../utils/colors';

class Update extends Command {
  async run() {
    const { now_secrets = {}, name } = JSON.parse(
      await loadFile('package.json')
    );
    const prefix = now_secrets.prefix || `${name}_`;
    const envFileName = now_secrets.env_file_name || `.env`;
    const envs = parse(await loadFile(envFileName));

    if (!envs.ZEIT_TOKEN || !prefix) {
      logError(
        dangerColor(`${textBold('ZEIT_TOKEN')} is not found in ${envFileName}`)
      );
      throw new Error('ZEIT_TOKEN is not found');
    }
  }
}

Update.description = `Update env of this project from .env file`;

module.exports = Update;
