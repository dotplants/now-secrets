import { writeFile } from 'fs';
import { resolve as pathResolve } from 'path';
import cli from 'cli-ux';
import { textBold, warningColor } from './colors';

const saveFile = (fileName: string, data: string): Promise<void> =>
  new Promise((resolve, reject) => {
    cli.action.start(`Saving ${textBold(fileName)}`);
    writeFile(pathResolve('.', fileName), data, 'utf-8', err => {
      if (err) {
        cli.action.stop(warningColor(`failed`));
        return reject(err);
      }
      cli.action.stop();
      resolve();
    });
  });

export default saveFile;
