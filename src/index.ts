import { ConfigTypes } from '@dotplants/cli';
import updateCommand from './commands/update';
import removeCommand from './commands/remove';

const { version } = require('../package.json');

const config: ConfigTypes = {
  name: `now-secrets v${version}`,
  binName: 'now-secrets',
  defaultCommand: 'update',
  commands: {
    update: {
      description: 'Update all secrets',
      function: updateCommand,
      flags: {
        noAdd: {
          name: ['clean', 'no-add', 'c'],
          description: 'Add only'
        },
        noRemove: {
          name: ['no-remove'],
          description: 'Remove only (clean)'
        },
        noUpdateNowJson: {
          name: ['no-update-vercel-json', 'no-update-now-json'],
          description: 'Do not update vercel.json'
        }
      }
    },
    remove: {
      description: 'Delete secrets',
      function: removeCommand,
      argsName: ['secret key', '...secret key'],
      flags: {
        force: {
          name: ['force', 'f'],
          description: 'Delete without confirm.'
        },
        teamId: {
          name: ['team', 't'],
          description: 'Input the slug if it is team secret.',
          hasValue: 1
        }
      }
    }
  }
};

module.exports = config;
