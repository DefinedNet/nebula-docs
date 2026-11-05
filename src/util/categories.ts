/**
 * The sidebar sections below "Get started". Each has an index page at `/<slug>/` listing its pages
 * as cards; the sidebar config in astro.config.ts and the breadcrumbs both read from here.
 */
export const categories = [
  {
    label: 'Guides',
    slug: 'docs/guides',
    description:
      'Step-by-step guides for configuring and troubleshooting Nebula overlay networks, including quick start, certificate management, DNS, and routing.',
  },
  {
    label: 'Security bulletins',
    slug: 'docs/security',
    description: 'Security bulletins for the Nebula overlay networking tool.',
  },
  {
    label: 'Config reference',
    slug: 'docs/config',
    description:
      'Complete reference for all Nebula configuration options including PKI, firewall rules, lighthouse, relay, tun, and more.',
  },
];
