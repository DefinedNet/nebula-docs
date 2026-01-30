import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import hq from 'alias-hq';
import darkCodeTheme from './src/prism-dark.cjs';
import lightCodeTheme from './src/prism-light.cjs';

let gtag: { trackingID: string; anonymizeIP: boolean } | undefined;

// Only enable google analytics in prod.  Note: this is a CF Workers environment variable.
if (process.env.GTAG_TRACKING_ID) {
  /* eslint-disable-next-line no-console -- Allow build config to log what's happening */
  console.log('Google Analytics enabled');
  gtag = {
    trackingID: process.env.GTAG_TRACKING_ID,
    anonymizeIP: true,
  };
} else {
  /* eslint-disable-next-line no-console -- Allow build config to log what's happening */
  console.log('Google Analytics disabled');
  gtag = undefined;
}

const config: Config = {
  title: 'Nebula Docs',
  tagline: 'Learn about Nebula here',
  url: 'https://nebula.defined.net',
  // For deploy previews, don't set a baseUrl
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  favicon: 'img/favicon.ico',

  plugins: [
    [
      'docusaurus-plugin-module-alias',
      {
        alias: hq.get('webpack'),
      },
    ],
  ],

  scripts: [
    {
      src: 'https://plausible.io/js/pa--fa02jhZoajfPxSb4zpFj.js',
      async: true,
    },
    '/scripts/plausible.js',
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
      {
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
        gtag,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/nebula-docs-og.png',
    navbar: {
      title: '',
      logo: {
        alt: 'Nebula logo',
        href: '/docs/',
        src: 'img/mark.svg',
        srcDark: 'img/mark-dark.svg',
      },
      items: [
        {
          href: 'https://defined.net',
          label: 'Defined Networking',
          position: 'right',
          rel: 'noopener',
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
              to: '/docs/guides/',
            },
            {
              label: 'Config Reference',
              to: '/docs/config/',
            },
            {
              label: 'Docs Github',
              href: 'https://github.com/DefinedNet/nebula-docs',
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
              href: 'https://join.slack.com/t/nebulaoss/shared_invite/zt-39pk4xopc-CUKlGcb5Z39dQ0cK1v7ehA',
            },
          ],
        },
        {
          title: 'Defined Networking',
          items: [
            {
              label: 'Home',
              href: 'https://defined.net',
              rel: 'noopener',
            },
            {
              label: 'Blog',
              href: 'https://defined.net/blog',
              rel: 'noopener',
            },
            {
              label: 'Docs',
              href: 'https://docs.defined.net',
              rel: 'noopener',
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
      additionalLanguages: ['bash'],
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
