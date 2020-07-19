[![now-secrets](https://i.imgur.com/vBAkYuW.png)](https://npm.im/now-secrets)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dotplants/now-secrets/Node%20CI?style=for-the-badge)](https://github.com/dotplants/now-secrets/actions)
[![GitHub](https://img.shields.io/github/license/dotplants/now-secrets?style=for-the-badge)](#license)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/dotplants/now-secrets/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

[English](https://github.com/dotplants/now-secrets/blob/master/README.md) | [日本語](https://github.com/dotplants/now-secrets/blob/master/docs/README.ja.md)

# What's this?

**now-secrets** is a command to automatically update [Vercel](https://vercel.com) secrets based on .env.

**⚠ This is an unofficial project.**

# Getting Started

- Install this package to global.

```bash
npx add-pkg -g now-secrets # add-pkg: https://add-pkg.dotplants.net
```

- Move to your project and edit `.env`.

```bash
cd /path/to/your-project
vi .env
```

- Add `VERCEL_TOKEN` to .env.
  > You can create the token from https://vercel.com/account/tokens.

```
VERCEL_TOKEN=foobar
OTHER_ENV=hogefuga
```

- Run `now-secrets`.

```
now-secrets
```

- If successful, `@{prefix}_{env_key}` has been added.

# Config

In `package.json`:

```
{
  ...
  "now_secrets": {
    "prefix": "",
    "env_file_name": "" // default: .env
  }
}
```

- prefix: `now_secrets.prefix` in package.json > `name` in vercel.json > `name` in package.json
- scope: `scope` in now.json > personal account

# CLI Usage

```
now-secrets v1.1.0

Usage: now-secrets [options]
Update all secrets

Options:
  --clean, --no-add, -c: Add only
  --no-remove: Remove only (clean)
  --no-update-vercel-json, --no-update-now-json: Do not update vercel.json

Usage: now-secrets [command] [options]

Commands:
  - update: Update all secrets
  - remove: Delete secrets
  - help: Show the help of cli

Run "now-secrets help [command]" for detailed usage of the command.
```

### Add only

> Vercel specifications: Secrets that have already been added return an error.

# License

- code: MIT
- icon: [Font Awesome - CC BY 4.0 License](https://fontawesome.com/license/free)
