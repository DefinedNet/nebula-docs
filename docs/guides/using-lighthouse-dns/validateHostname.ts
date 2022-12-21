export const INVALID_HOSTNAME = 'Invalid hostname';

export function validateHostname(hostname: string): true | typeof INVALID_HOSTNAME {
  if (!hostname.length) {
    return true;
  }

  // sourced & modified from https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
  const domainRegex = new RegExp('\\b((?=[a-z0-9-]{1,63}\\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,63}\\b', 'gmi');

  if (domainRegex.test(hostname) == true) {
    return true;
  } else {
    return INVALID_HOSTNAME;
  }
}
