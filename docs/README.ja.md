[![now-secrets](https://i.imgur.com/vBAkYuW.png)](https://npm.im/now-secrets)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dotplants/now-secrets/Node%20CI?style=for-the-badge)](https://github.com/dotplants/now-secrets/actions)
[![GitHub](https://img.shields.io/github/license/dotplants/now-secrets?style=for-the-badge)](#license)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/dotplants/now-secrets/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

[English](https://github.com/dotplants/now-secrets/blob/master/README.md) | [日本語](https://github.com/dotplants/now-secrets/blob/master/docs/README.ja.md)

# これは何？

**now-secrets** は .env に基づいて[Vercel](https://vercel.com)のシークレットを自動でアップデートするコマンドを提供します。

**⚠ これは非公式のプロジェクトです。**

# 始める

- このパッケージをグローバルインストールします。

```bash
npx add-pkg -g now-secrets # add-pkg: https://add-pkg.dotplants.net
```

- あなたのプロジェクトに移動し、 `.env` を編集します。

```bash
cd /path/to/your-project
vi .env
```

- `VERCEL_TOKEN` を.env に追加します。
  > トークンは https://vercel.com/account/tokens から作成できます。

```
VERCEL_TOKEN=foobar
OTHER_ENV=hogefuga
```

- `now-secrets` を実行します。

```
now-secrets
```

- 成功した場合、 `@{prefix}_{env_key}` が追加されています。

# 設定

`package.json` 内:

```
{
  ...
  "now_secrets": {
    "prefix": "",
    "env_file_name": "" // デフォルト: .env
  }
}
```

- prefix: package.json 内の `now_secrets.prefix` > vercel.json 内の `name` > package.json 内の `name`
- scope: now.json 内の `scope` > 個人アカウント

# CLI Usage

```
now-secrets v1.1.0

Usage: now-secrets [options]
Update all secrets

Options:
  --clean, --no-add, -c: Remove only (clean)
  --no-remove: Add only
  --no-update-vercel-json, --no-update-now-json: Do not update vercel.json

Usage: now-secrets [command] [options]

Commands:
  - update: Update all secrets
  - remove: Delete secrets
  - help: Show the help of cli

Run "now-secrets help [command]" for detailed usage of the command.
```

### 追加のみ実行

> Vercel の仕様: 既にあるシークレットを新たに追加しようとした場合はエラーが返ります。

# License

- code: MIT
- icon: [Font Awesome - CC BY 4.0 License](https://fontawesome.com/license/free)
