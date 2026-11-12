import { satteri } from '@astrojs/markdown-satteri';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLinksValidator from 'starlight-links-validator';
import { categories } from './src/util/categories';

// Hex copies of the ramps in src/css/base.css. Expressive Code runs contrast and alpha math
// over theme colors, so it rejects `var(...)` and hsl() here.
const palette = {
  gray12: '#1a1e23',
  gray30: '#414b58',
  gray42: '#5b697b',
  gray58: '#8492a4',
  gray96: '#f3f5f6',
  green30: '#1c7d39',
  green80: '#abedbf',
  orange30: '#974a02',
  orange80: '#fdca9b',
  red30: '#872b12',
  red80: '#f3b6a5',
  blue30: '#164e83',
  blue80: '#a8cdf0',
  purple30: '#381584',
  purple80: '#bea7f1',
};

type Tone = 'plain' | 'constant' | 'function' | 'deleted' | 'keyword' | 'value' | 'comment';

// Token groups shared by both themes; each theme only picks the color per group.
const scopes: Record<Exclude<Tone, 'plain'>, string[]> = {
  constant: ['constant.language', 'constant.other', 'variable.other.constant', 'support.constant'],
  function: ['entity.name.function', 'support.function', 'meta.function-call'],
  deleted: ['markup.deleted', 'constant.other.symbol'],
  keyword: ['keyword', 'storage', 'entity.name.tag'],
  value: [
    'string',
    'constant.numeric',
    'constant.character',
    'variable',
    'entity.other.attribute-name',
    'support.type',
    'support.class',
    'markup.inserted',
  ],
  comment: ['comment', 'punctuation'],
};

// YAML keys and unquoted scalars read as plain text, so the config reference stays calm.
const plainScopes = ['entity.name.tag.yaml', 'string.unquoted.plain.out.yaml', 'keyword.operator'];

function codeTheme(name: string, type: 'light' | 'dark', colors: Record<Tone, string>, background: string) {
  return {
    name,
    type,
    colors: {
      'editor.foreground': colors.plain,
      'editor.background': background,
    },
    tokenColors: [
      ...Object.entries(scopes).map(([tone, scope]) => ({
        scope,
        settings: { foreground: colors[tone as Tone] },
      })),
      { scope: plainScopes, settings: { foreground: colors.plain } },
    ],
  };
}

const lightCodeTheme = codeTheme(
  'nebula-light',
  'light',
  {
    plain: palette.gray30,
    constant: palette.green30,
    function: palette.orange30,
    deleted: palette.red30,
    keyword: palette.blue30,
    value: palette.purple30,
    // gray-42 meets WCAG AA (4.5:1) on the light code surface
    comment: palette.gray42,
  },
  palette.gray96,
);

const darkCodeTheme = codeTheme(
  'nebula-dark',
  'dark',
  {
    plain: '#f8f8f2',
    constant: palette.green80,
    function: palette.orange80,
    deleted: palette.red80,
    keyword: palette.blue80,
    value: palette.purple80,
    // gray-58 meets WCAG AA (4.5:1) on the dark code surface
    comment: palette.gray58,
  },
  palette.gray12,
);

// Google Analytics only loads where the build sets GTAG_TRACKING_ID (production deploys on main).
const gtagId = process.env.GTAG_TRACKING_ID;

// https://astro.build/config
export default defineConfig({
  site: 'https://nebula.defined.net',
  trailingSlash: 'always',
  // CI deploys `build/` to Cloudflare Pages
  outDir: './build',
  markdown: {
    // Straight quotes stay straight: several pages quote literal config values and commands
    processor: satteri({ features: { smartPunctuation: false } }),
  },
  integrations: [
    react(),
    starlight({
      title: 'Nebula Docs',
      description: 'Documentation for Nebula, an open source overlay networking tool',
      favicon: '/img/favicon.ico',
      logo: {
        light: './public/img/mark.svg',
        dark: './public/img/mark-dark.svg',
        alt: 'Nebula logo',
        replacesTitle: true,
      },
      editLink: {
        baseUrl: 'https://github.com/DefinedNet/nebula-docs/edit/main/',
      },
      lastUpdated: true,
      customCss: ['./src/css/base.css', './src/css/starlight.css', './src/css/components.css'],
      head: [
        {
          tag: 'meta',
          attrs: { name: 'keywords', content: 'nebula, overlay network, VPN, mesh networking, defined networking' },
        },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://nebula.defined.net/img/nebula-docs-og.jpg' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://nebula.defined.net/img/nebula-docs-og.jpg' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap',
          },
        },
        { tag: 'script', attrs: { src: 'https://plausible.io/js/pa--fa02jhZoajfPxSb4zpFj.js', async: true } },
        { tag: 'script', attrs: { src: '/scripts/plausible.js' } },
        ...(gtagId
          ? [
              { tag: 'link' as const, attrs: { rel: 'preconnect', href: 'https://www.google-analytics.com' } },
              { tag: 'link' as const, attrs: { rel: 'preconnect', href: 'https://www.googletagmanager.com' } },
              {
                tag: 'script' as const,
                attrs: { src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`, async: true },
              },
              {
                tag: 'script' as const,
                content: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(gtagId)},{anonymize_ip:true});`,
              },
            ]
          : []),
      ],
      routeMiddleware: './src/routeData.ts',
      components: {
        Header: './src/components/starlight/Header.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
        PageSidebar: './src/components/starlight/PageSidebar.astro',
        Pagination: './src/components/starlight/Pagination.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
        MobileMenuFooter: './src/components/starlight/Empty.astro',
      },
      expressiveCode: {
        themes: [darkCodeTheme, lightCodeTheme],
        useStarlightUiThemeColors: false,
        styleOverrides: {
          borderRadius: 'var(--radius-md)',
          borderColor: 'var(--border-color)',
          codeFontFamily: 'var(--font-mono)',
          codeFontSize: '0.875rem',
          codeLineHeight: '1.45',
          uiFontFamily: 'var(--font-sans)',
          frames: {
            frameBoxShadowCssValue: 'none',
          },
        },
      },
      plugins: [starlightLinksValidator()],
      sidebar: [
        { label: 'Get started', items: ['docs'] },
        ...categories.map(({ label, slug }) => ({
          label,
          collapsed: true,
          items: [{ autogenerate: { directory: slug } }],
        })),
      ],
    }),
  ],
});
