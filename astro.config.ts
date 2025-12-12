import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Nebula',
      logo: {
        alt: 'Nebula Docs',
        light: './src/assets/mark.svg',
        dark: './src/assets/mark-dark.svg',
      },
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
