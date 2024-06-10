// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig & {astroAllowShorthand?: boolean, experimentalTernaries?: boolean}} */
export default {
  printWidth: 120,
  singleQuote: true,
  proseWrap: 'always',
  importOrder: [
    '<BUILT_IN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(@components|@docs|@src)(.*)$',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
  importOrderParserPlugins: ['jsx', 'typescript'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};
