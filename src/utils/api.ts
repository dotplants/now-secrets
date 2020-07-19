import axios, { AxiosRequestConfig } from 'axios';
import { parse } from 'dotenv';
import { dangerColor, successColor, textBold } from './colors';
import { log } from './logger';
import loadFile from './load-file';

type argsType = {
  path: string;
  method?: AxiosRequestConfig['method'];
  data?: {
    [keys: string]: string;
  };
  teamId?: string;
};

let token: string;

const api = async ({
  path,
  method = 'GET',
  data = {},
  teamId
}: argsType): Promise<any> => {
  if (!token) {
    const packageJson = JSON.parse(
      (await loadFile('package.json', false)) || '{}'
    );
    if (!packageJson.now_secrets) packageJson.now_secrets = {};

    const envFileName = packageJson.now_secrets.env_file_name || `.env`;
    const envs = parse(await loadFile(envFileName));

    token = envs.VERCEL_TOKEN || envs.ZEIT_TOKEN;
    if (!token) {
      throw new Error(
        `${textBold('VERCEL_TOKEN')} is not found in ${envFileName}`
      );
    }
  }

  return new Promise((resolve, reject) => {
    const defaultParams = teamId ? { teamId } : {};
    const url = `https://api.vercel.com/${path}`;
    log(`Request: ${textBold(url)}`);

    axios({
      method,
      url,
      params:
        method === 'POST' ? defaultParams : Object.assign(defaultParams, data),
      data: method === 'POST' ? data : null,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        log(successColor(`Success: ${textBold(resp.status)}`));
        return resolve(resp.data);
      })
      .catch(error => {
        log(dangerColor(`Failed: ${textBold(error.response.status)}`));
        return reject(error);
      });
  });
};

export default api;
