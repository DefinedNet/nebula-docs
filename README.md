# Nebula documentation

This is the documentation for the [nebula open source project](https://github.com/slackhq/nebula).

Status: Currently work-in-progress and not yet published, but the content matches https://www.defined.net/nebula/.

## Commands Cheatsheet

All commands are run from the root of the project, from a terminal:

| Command          | Action                                       |
|:-----------------|:---------------------------------------------|
| `npm install`    | Installs dependencies                        |
| `npm start`      | Starts local dev server at `localhost:3000`  |


## CMS

The content for this site is managed by Netlify CMS, a git-based content management system.  To add new content, visit `localhost:3000/admin` after starting the dev server locally.  When you run `npm start`, a proxy server that does not attempt to authenticate with GitHub will also be started, allowing changes to be made to the repo on your filesystem, which should then be pushed up and submitted as a pull request.

If you prefer working in your editor, we suggest creating new files through the cms so that the proper frontmatter is created, and then you're free to edit files directly on disk.

## Internationalization (i18n)

To add a non-English translation of the docs, open the CMS and add a new locale in Settings -> Locales.  After that is added, you'll be able to edit each Page and change the locale at the top of the right hand side ("Writing in EN").

## Architecture

This project is not published directly to the web, but the files in `/src/data` are pulled in to the build process of [defined.net/nebula](https://www.defined.net/nebula/).

The other components, styles, and layout in `/src` are very similar to what is published under `/nebula/` on the Defined Networking website. This repo contains a few additional files to make it easier for contributors to run a standalone Nebula Docs server and to preview rendered changes locally before submitting a pull request.

### Config Reference

The configuration reference is constructed differently from the other pages.  It is composed of the `config.md` file which provides the top of the page, and `config-reference.md` which contains the actual configuration option documentation.  This separation was done to support internationalization.

## Known Issues

### Optimizing warning

When viewing the localhost site for the first time, you may see the following displayed in your browser.

> [vite] Something unexpected happened while optimizing "/en/overview"
>
> The current page should have reloaded by now

Refresh your browser to work around this warning. The correctly rendered page will display after one or two refreshes.

