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
      customCss: ['./src/css/base.css', './src/css/theme.css', './src/css/utility.css'],
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
          items: [
            {
              label: 'Quick Start',
              link: '/guides/quick-start',
            },
            {
              label: 'Debugging with Nebula SSH commands',
              link: '/guides/debug-ssh-commands',
            },
            {
              label: 'Rotating a Certificate Authority',
              link: '/guides/rotating-certificate-authority',
            },
            {
              label: 'Signing a Certificate Without a Private Key',
              link: '/guides/sign-certificates-with-public-keys',
            },
            {
              label: 'Extend network access beyond overlay hosts',
              link: '/guides/unsafe_routes',
            },
            {
              label: 'Upgrading a Nebula network to IPv6 overlay addresses',
              link: '/guides/upgrade-to-cert-v2-and-ipv6',
            },
            {
              label: 'Using Experimental Lighthouse DNS with Nebula',
              link: '/guides/using-lighthouse-dns',
            },
            {
              label: 'Viewing Nebula Logs',
              link: '/guides/viewing-nebula-logs',
            },
          ],
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
  server: {
    port: 3000,
  },
  vite: {
    resolve: {
      alias: {
        '@theme': '/src/components',
      },
    },
  },
});
