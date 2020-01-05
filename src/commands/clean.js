import { Command } from '@oclif/command';

class Clean extends Command {
  async run() {
    this.log(`This command is working in progress`);
  }
}

Clean.description = `Clean all env of this project`;

module.exports = Clean;
