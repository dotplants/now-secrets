import axios, { AxiosRequestConfig } from 'axios';
import { dangerColor, successColor, textBold } from './colors';
import { log } from './logger';

type argsType = {
  path: string;
  method?: AxiosRequestConfig['method'];
  data?: {
    [keys: string]: string;
  };
  token: string;
  teamId?: string;
};

const api = ({
  path,
  method = 'GET',
  data = {},
  token,
  teamId
}: argsType): Promise<any> =>
  new Promise((resolve, reject) => {
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

export default api;
