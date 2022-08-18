module.exports = {
  printWidth: 120,
  singleQuote: true,
  importOrder: ['^(@components|@docs|@src)(.*)$', '^(?!.*[.]css$)[./].*$', '.css$'],
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['jsx', 'typescript'],
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
};
