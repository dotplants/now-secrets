# now-secrets

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dotplants/now-secrets/Node%20CI?style=for-the-badge)](https://github.com/dotplants/now-secrets/actions)
[![GitHub](https://img.shields.io/github/license/dotplants/now-secrets?style=for-the-badge)](#license)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/dotplants/now-secrets/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

# What's this?

## ⚠This project is working in progress. Do not use this command.

**now-secrets** is a command to automatically update ZEIT Now secrets based on .env.

# How to Use

- Install this command to global.

```bash
npx add-pkg -g now-secrets # add-pkg: https://add-pkg.dotplants.net
```

- Move to your project and edit .env.

```bash
cd /path/to/your-project
vi .env
```

- Add `ZEIT_TOKEN` to .env.
  > You can create the token from https://zeit.co/account/tokens.

```
ZEIT_TOKEN=foobar
```

- Run `now-secrets`.

```
now-secrets
```

# License

- code: MIT
