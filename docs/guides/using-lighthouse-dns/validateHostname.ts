import { parseDomain, ParseResultType } from 'parse-domain';

export const INVALID_HOSTNAME = 'Invalid hostname';
export const INVALID_HOSTNAME_IP = 'An IP is not a valid hostname for DNS';

export function validateHostname(hostname: string): true | string {
  if (!hostname.length) {
    return true;
  }

  const result = parseDomain(hostname);

  if (result.type === ParseResultType.Invalid) {
    return `${INVALID_HOSTNAME}: ${result.errors[0].message}`;
  }
  if (result.type === ParseResultType.Ip) {
    return INVALID_HOSTNAME_IP;
  }
  return true;
}
