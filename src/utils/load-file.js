import { readFile } from 'fs';
import { resolve as pathResolve } from 'path';
import cli from 'cli-ux';
import { textBold, warningColor } from './colors';

const loadFile = fileName =>
  new Promise((resolve, reject) => {
    cli.action.start(`Loading ${textBold(fileName)}`);
    readFile(pathResolve('.', fileName), 'utf-8', (err, data) => {
      if (err) {
        cli.action.stop(
          warningColor(`file ${textBold(fileName)} is not found`)
        );
        return reject(err);
      }
      cli.action.stop();
      resolve(data);
    });
  });

export default loadFile;
