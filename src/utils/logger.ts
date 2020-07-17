import { infoColor } from './colors';

export const log = (...args: any[]): void =>
  console.log(infoColor('[now-secrets]'), ...args);
export const logError = (...args: any[]): void =>
  console.error(infoColor('[now-secrets]'), ...args);
