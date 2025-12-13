import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nebula.defined.net',
  integrations: [
    starlight({
      title: 'Nebula',
      logo: {
        alt: 'Nebula Docs',
        light: './src/assets/mark.svg',
        dark: './src/assets/mark-dark.svg',
        replacesTitle: true,
      },
      editLink: {
        baseUrl: 'https://github.com/DefinedNet/nebula-docs/edit/main/',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/slackhq/nebula',
        },
        {
          icon: 'slack',
          label: 'Slack',
          href: 'https://join.slack.com/t/nebulaoss/shared_invite/zt-39pk4xopc-CUKlGcb5Z39dQ0cK1v7ehA',
        },
      ],
      sidebar: [
        {
          label: 'Introduction to Nebula',
          link: '/',
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
          collapsed: true,
        },
        {
          label: 'Security Bulletins',
          autogenerate: { directory: 'security' },
          collapsed: true,
        },
        {
          label: 'Config Reference',
          autogenerate: { directory: 'config' },
          collapsed: true,
        },
      ],
    }),
    react(),
  ],
  vite: {
    resolve: {
      alias: {
        '@theme': '/src/components',
      },
    },
  },
});
