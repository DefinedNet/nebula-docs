import { fromUrl, NO_HOSTNAME, parseDomain } from 'parse-domain';
import { validateHostname } from './validateHostname';

export function remapHostnameIfValid(hostname: string) {
  if (!hostname.length || typeof validateHostname(hostname) === 'string') {
    return hostname;
  }

  // use fromUrl to set lower case
  const { hostname: parsedHostname } = parseDomain(fromUrl(hostname));

  if (parsedHostname === NO_HOSTNAME) {
    return hostname;
  }

  return parsedHostname;
}
