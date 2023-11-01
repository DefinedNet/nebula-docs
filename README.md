# Nebula documentation

This is the documentation for the [nebula open source project](https://github.com/slackhq/nebula).

## Commands Cheatsheet

All commands are run from the root of the project, from a terminal:

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm start`   | Starts local dev server at `localhost:3000` |

## Environment setup

#### Node.js and pnpm

To develop this code, you'll need node.js. The exact version you get doesn't matter much, as long as it meets the
requirements set in the `package.json` `engines` field, but you can reference the value in `.nvmrc` for the version that
is used in CI.

You can install node.js directly from https://nodejs.org/en/download/, or you can use a tool like
[fnm](https://github.com/Schniz/fnm) to handle automatically changing your node version when switching between projects
with different requirements.

To get `pnpm`, run `corepack enable` after installing `node`, and `corepack` should install the right `pnpm` version for
you.

#### Project dependencies

To install our javascript dependencies, run `pnpm install` (or `pnpm i` for short). You'll want to do this whenever you
change branches, if there's a possibility that dependencies have been changed or updated. If you're not able to start up
the client app, this is a good first troubleshooting step to take.
