// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
// uncomment to run the server on all local network interfaces,
// which can be useful for previewing the site on mobile devices
//  devOptions: { hostname: '0.0.0.0'},
  renderers: [
    // Enable the React renderer, for the Algolia search component
    '@astrojs/renderer-react',
  ],
});
