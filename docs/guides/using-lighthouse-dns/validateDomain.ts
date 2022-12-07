export const INVALID_DOMAIN = 'Invalid domain';

export function validateDomain(domain: string): true | typeof INVALID_DOMAIN {
  if (!domain.length) {
    return true;
  }

  // sourced from https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
  const domainRegex = new RegExp('\\b((?=[a-z0-9-]{1,63}\\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,63}\\b', 'gm');

  if (domainRegex.test(domain) == true) {
    return true;
  } else {
    return INVALID_DOMAIN;
  }
}
