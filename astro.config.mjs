import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react()],
  markdownOptions: {
    render: [
      "@astrojs/markdown-remark",
      {
        syntaxHighlight: "prism",
      },
    ],
  },
});
