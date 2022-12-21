import { INVALID_HOSTNAME, validateHostname } from './validateHostname';

export function remapHostnameIfValid(hostname: string) {
  if (!hostname.length || validateHostname(hostname) === INVALID_HOSTNAME) {
    return hostname;
  }

  return hostname.toLocaleLowerCase();
}
