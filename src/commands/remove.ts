import cli from 'cli-ux';

import { log } from '../utils/logger';
import { dangerColor, infoColor, textBold } from '../utils/colors';
import api from '../utils/api';

type argsType = {
  args: Array<string>;
  flags: {
    teamId?: string;
    force: boolean;
  };
};

const removeCommand = async ({
  args,
  flags: { teamId, force }
}: argsType): Promise<void> => {
  if (args.length <= 0) {
    throw new Error('argument is required.');
  }

  if (teamId) {
    const { id } = await api({
      path: 'v1/teams',
      data: { slug: teamId }
    });
    log(`Using ${textBold(teamId)}`);
    teamId = id;
  }

  log(
    dangerColor('Remove: ' + args.map(arg => textBold(`@${arg}`)).join(', '))
  );

  if (!force && !(await cli.confirm('Are you sure?'))) {
    throw new Error('User aborted');
  }

  log(infoColor('Removing secrets...'));
  const removePromises = args.map(secret =>
    api({
      path: `v2/now/secrets/${secret}`,
      method: 'DELETE',
      teamId
    })
  );
  await Promise.all(removePromises);
};

export default removeCommand;
