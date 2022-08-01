import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [
      "remark-gfm",
      "@silvenon/remark-smartypants",
      [
        "remark-external-links",
        {
          protocols: ["http", "https", "mailto"],
          content: { type: "text", value: "" },
          contentProperties: { className: ["fas", "fa-external-link-alt"], ariaHidden: "true" },
        },
      ],
    ],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "append",
          properties: {
            ariaHidden: "true",
            tabIndex: -1,
            className: "heading-link no-underline",
          },
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["fas", "fa-link"] },
            children: [],
          },
        },
      ],
      [
        "rehype-add-classes",
        {
          h1: "h3",
          h2: "h4",
          h3: "h5",
          h4: "h5",
          h5: "h6",
          h6: "h6",
          p: "p",
        },
      ],
    ],
  },
});
