import { version } from '../../../package';
import { textBold } from '../../utils/colors';

const Hello = async () => {
  console.log(textBold(`now-secrets v${version}`));
  console.log();
};

export default Hello;
