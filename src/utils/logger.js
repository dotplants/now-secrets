import { infoColor } from './colors';

export const log = (...args) =>
  console.log(infoColor('[now-secrets]'), ...args);
export const logError = (...args) =>
  console.error(infoColor('[now-secrets]'), ...args);
