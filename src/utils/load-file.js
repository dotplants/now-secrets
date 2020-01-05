import { readFile } from 'fs';
import { resolve as pathResolve } from 'path';
import { textBold, warningColor } from './colors';
import { log, logError } from './logger';

const loadFile = fileName =>
  new Promise((resolve, reject) => {
    log(`Loading ${textBold(fileName)}...`);
    readFile(pathResolve('.', fileName), 'utf-8', (err, data) => {
      if (err) {
        logError(warningColor(`file ${textBold(fileName)} is not found`));
        return reject(err);
      }

      resolve(data);
    });
  });

export default loadFile;
