// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * Writes /llms.txt at build time: a plain-text index of every doc (title,
 * URL, description) grouped by top-level section, following the llms.txt
 * convention that answer engines and LLM crawlers read. Built from the docs
 * plugin's loaded content so it never drifts from the sidebar.
 */
module.exports = function llmsTxtPlugin(context) {
  /** @type {Array<{title: string, description?: string, permalink: string, sidebarPosition?: number, sourceDirName: string}>} */
  let docs = [];

  return {
    name: 'llms-txt',

    allContentLoaded({ allContent }) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default;
      const version = docsContent?.loadedVersions?.[0];
      docs = version?.docs ?? [];
    },

    async postBuild({ outDir }) {
      const { url, title, tagline } = context.siteConfig;
      // Section order mirrors the sidebar. Top-level single pages (intro,
      // install, quick start, how it works, FAQ) fold into "Get started".
      const order = ['Get started', 'guides', 'platforms', 'use-cases', 'migrate', 'concepts', 'config', 'security'];
      const labels = {
        'use-cases': 'Use cases',
        config: 'Config reference',
        security: 'Security bulletins',
      };
      const sections = new Map(order.map((k) => [k, []]));
      for (const doc of docs) {
        const dir = doc.sourceDirName.split('/')[0];
        const top = order.includes(dir) ? dir : 'Get started';
        sections.get(top).push(doc);
      }
      const label = (dir) => labels[dir] ?? (dir === 'Get started' ? dir : dir.charAt(0).toUpperCase() + dir.slice(1));
      const lines = [
        `# ${title}`,
        '',
        `> ${tagline}.`,
        '',
        'Nebula is an open source, self-hosted overlay network and mesh VPN created at Slack and maintained by Defined Networking. These docs cover installing it, running lighthouses, NAT traversal, certificates, routing, and the full configuration reference.',
        '',
      ];
      for (const [dir, items] of sections) {
        if (items.length === 0) continue;
        lines.push(`## ${label(dir)}`, '');
        items
          .sort(
            (a, b) => (a.sidebarPosition ?? 99) - (b.sidebarPosition ?? 99) || a.permalink.localeCompare(b.permalink),
          )
          .forEach((d) => {
            const desc = (d.description ?? '').replace(/\s+/g, ' ').trim();
            lines.push(`- [${d.title}](${url}${d.permalink})${desc ? `: ${desc}` : ''}`);
          });
        lines.push('');
      }
      lines.push(
        '## Related sites',
        '',
        `- [Defined Networking](https://www.defined.net/): Managed Nebula, comparisons, and the glossary`,
        `- [Managed Nebula docs](https://docs.defined.net/)`,
        `- [Nebula on GitHub](https://github.com/slackhq/nebula)`,
        '',
      );
      fs.writeFileSync(path.join(outDir, 'llms.txt'), lines.join('\n'));
    },
  };
};
