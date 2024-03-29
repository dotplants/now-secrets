import { readFile } from 'fs';
import { resolve as pathResolve } from 'path';
import cli from 'cli-ux';
import { textBold, warningColor } from './colors';

const loadFile = (fileName: string, isRequired = true): Promise<string> =>
  new Promise((resolve, reject) => {
    cli.action.start(`Loading ${textBold(fileName)}`);
    readFile(pathResolve('.', fileName), 'utf-8', (err, data) => {
      if (err) {
        cli.action.stop(
          warningColor(`file ${textBold(fileName)} is not found`)
        );
        if (isRequired) {
          return reject(err);
        }
      }
      cli.action.stop();
      resolve(data);
    });
  });

export default loadFile;
