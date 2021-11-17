import type {CmsConfig} from "netlify-cms-core";
import {ALL_LOCALES} from '../../languages';

export const config: CmsConfig = {
  load_config_file: false,
  media_folder: "public/images/uploads",
  public_folder: "/images/uploads",
  // Must be running netlify-cms-proxy-server for local editing to work correctly
  local_backend: true,
  backend: {
    name: "github",
    branch: "main",
    repo: "DefinedNet/nebula-docs",
    squash_merges: true,
  },
  collections: [
    {
      name: "pages",
      label: "Pages",
      label_singular: "Page",
      delete: false,
      create: true,
      folder: "src/data/docs",
      i18n: true,
      slug: "{{fields.slug}}",
      fields: [
        { name: "title", label: "Title", widget: "string", i18n: true },
        { name: "slug", label: "Slug", widget: "string", i18n: true },
        { name: "summary", label: "Summary", widget: "text", i18n: true },
        { name: "body", label: "Body", widget: "markdown", i18n: true },
      ]
    },
    {
      name: "nebulaConfig",
      label: "Nebula Config Options",
      label_singular: "Nebula Config Option",
      i18n: {
        structure: 'single_file',
        locales: ALL_LOCALES
      },
      delete: false,
      create: false,
      files: [
        {
          name: "options",
          label: "Config Options",
          file: "src/data/config-reference.md",
          description: "Available options to set in nebula config file",
          fields: [
            {
              name: "options",
              label: "Options",
              label_singular: "Option",
              widget: "list",
              fields: [
                {name: "name", label: "Option name", widget: "string"},
                {name: "required", label: "Required?", widget: "boolean", required: false},
                {name: "description", label: "Description", widget: "markdown", i18n: true},
                {name: "example", label: "Example", widget: "code", default_language: 'yaml', output_code_only: true, allow_language_selection: false, hint: 'Example config in yml format', required: false},
                {name: "suboptions", label: "Sub-options", label_singular: "Sub-option", summary: "{{fields.name}}", widget: "list", fields: [
                  {name: "name", label: "Option name", widget: "string"},
                  {name: "required", label: "Required?", widget: "boolean", required: false},
                  {name: "description", label: "Description", widget: "markdown", i18n: true},
                  {name: "example", label: "Example", widget: "code", default_language: 'yaml', output_code_only: true, allow_language_selection: false, hint: 'Example config in yml format', required: false},
                ]}
              ]
            }
          ],
        }
      ],
    },
    {
      name: "settings",
      label: "Settings",
      delete: false,
      editor: { preview: false },
      files: [
        {
          name: "locales",
          label: "Locales",
          file: "src/data/settings/locales.json",
          description: "Currently supported language locales.  If adding another, also edit i18n.locales in scripts/cms/config.ts",
          fields: [
            {
              name: "locales",
              label: "Locales",
              label_singular: "Locale",
              widget: "list",
              fields: [
                { 
                  name: "language", 
                  label: "Language", 
                  widget: "string", 
                  hint: "Native name of the language, endonym (e.g. Español)",
                },
                {
                  name: "locale",
                  label: "Locale code",
                  widget: "string",
                  hint: "Two character locale code (ISO 639-1)",
                  pattern: ["^([a-z]){2}$", "Must be two lowercase letters."],
                }
              ]
            }
          ]
        },
        {
          name: "sidebar",
          label: "Sidebar config",
          file: "src/data/settings/sidebar.json",
          description: "Organization of pages in sidebar",
          fields: [
            {
              name: "sidebar",
              label: "Docs pages",
              label_singular: "Docs page",
              widget: "list",
              fields: [
                {
                  name: "page",
                  label: "Page",
                  widget: "relation",
                  collection: "pages",
                  search_fields: ["title"],
                  value_field: "{{slug}}",
                  display_fields: ["title"],
                },
              ],
            },
          ],
        }
      ],
    }
  ],
  i18n: {
    structure: "multiple_folders",
    default_locale: "en",
    locales: ALL_LOCALES,
  }
}
