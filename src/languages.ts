import localeSettings from './data/settings/locales.json';
const {locales} = localeSettings;

const DEFAULT_LOCALE = 'en';

export const KNOWN_LANGUAGES = locales.reduce((accum, l) => {
  accum[l.language] =  l.locale;
  return accum
}, {});
export const KNOWN_LANGUAGE_CODES = locales.map(l => l.locale);
export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;
export const langFilePathRegex = /src\/data\/.*([a-z]{2}-?[A-Z]{0,2})\//;

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(langPathRegex);
  return langCodeMatch ? langCodeMatch[1] : DEFAULT_LOCALE;
}

export function getLanguageFromFilename(filename: string) {
  const langCodeMatch = filename.match(langFilePathRegex);
  return langCodeMatch ? langCodeMatch[1] : DEFAULT_LOCALE;
}

export function getSlugFromFilename(filename: string) {
  const fileName = filename.split('/').at(-1);
  const [slug] = fileName.split('.');
  return slug;
}
