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

The content for this site is managed by netlify cms.  To make changes, visit `localhost:3000/admin`.  When you run `npm start`, a proxy server that does not attempt to authenticate with GitHub will also be started, allowing changes to be made to the repo your filesystem, which should then be pushed up and submitted as a pull request.

## Internationalization (i18n)

To add a non-English translation of the docs, open the CMS and add a new locale in Settings -> Locales.  After that is added, you'll be able to edit each Page and change the locale at the top of the right hand side ("Writing in EN").

## New to Astro?

Welcome! Check out [the documentation](https://github.com/snowpackjs/astro) or jump into the [Discord server](https://astro.build/chat).
