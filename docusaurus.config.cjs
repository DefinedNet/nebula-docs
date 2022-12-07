// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('./src/prism-dark.cjs');
const lightCodeTheme = require('./src/prism-light.cjs');
const hq = require('alias-hq');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nebula Docs',
  tagline: 'Learn about Nebula here',
  url: 'https://nebula.defined.net',
  // For deploy previews, don't set a baseUrl
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  plugins: [
    [
      'docusaurus-plugin-module-alias',
      {
        alias: hq.get('webpack'),
      },
    ],
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/definednet/nebula-docs/tree/main/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/base.css'),
            require.resolve('./src/css/theme.css'),
            require.resolve('./src/css/utility.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/theme-common').ThemeConfig} */
    {
      image: 'img/nebula-docs-og.png',
      navbar: {
        title: 'Nebula Docs',
        logo: {
          alt: 'Defined Networking logo',
          href: '/docs',
          src: 'img/mark.svg',
          srcDark: 'img/mark-dark.svg',
        },
        items: [
          {
            href: 'https://defined.net',
            label: 'Defined Networking',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Guides',
                to: '/docs/guides',
              },
              {
                label: 'Config Reference',
                to: '/docs/config',
              },
            ],
          },
          {
            title: 'Nebula',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/slackhq/nebula',
              },
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/nebulaoss/shared_invite/enQtOTA5MDI4NDg3MTg4LTkwY2EwNTI4NzQyMzc0M2ZlODBjNWI3NTY1MzhiOThiMmZlZjVkMTI0NGY4YTMyNjUwMWEyNzNkZTJmYzQxOGU',
              },
            ],
          },
          {
            title: 'Defined Networking',
            items: [
              {
                label: 'Home',
                href: 'https://defined.net',
              },
              {
                label: 'Blog',
                href: 'https://defined.net/blog',
              },
              {
                label: 'Docs',
                href: 'https://docs.defined.net/dn',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/DefinedNet',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Defined Networking.`,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '3Z2PF7OC67',

        // Public Search API key: it is safe to commit it
        apiKey: 'e18093227a63ac004263f767e3f5a896',

        indexName: 'defined-nebula',

        contextualSearch: false,

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: false,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

module.exports = config;
