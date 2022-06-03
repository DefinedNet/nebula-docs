import localeSettings from "./data/settings/locales.json";

const { locales } = localeSettings;

export const DEFAULT_LOCALE = "en";
const PLACEHOLDER_LOCALE = "xx";

export const KNOWN_LANGUAGES = locales
  // Remove this filter to treat placeholder locale as a real locale
  .filter((l) => l.locale !== PLACEHOLDER_LOCALE)
  .reduce((accum, l) => {
    accum[l.language] = l.locale;
    return accum;
  }, {});

export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

/**
 * Currently, we use a "placeholder" locale within the CMS to enable i18n support,
 * but we only have English versions of our content so far.  This `ALL_LOCALES` includes
 * the placeholder, to trick the CMS.  But the _real_ locales are exported by KNOWN_LANGUAGE_CODES
 */
export const ALL_LOCALES = locales.map((l) => l.locale);

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
  const filenameParts = filename.split("/");
  const fileName = filenameParts[filenameParts.length - 1];
  const [slug] = fileName.split(".");
  return slug;
}
