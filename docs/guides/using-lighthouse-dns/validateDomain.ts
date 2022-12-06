export const INVALID_DOMAIN = 'Invalid domain';

export function validateDomain(domain: string): true | typeof INVALID_DOMAIN {
  if (!domain.length) {
    return true;
  }

  const domainRegex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);

  if (domainRegex.test(domain) == true) {
    return true;
  } else {
    return INVALID_DOMAIN;
  }
}
