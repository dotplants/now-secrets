[![now-secrets](https://i.imgur.com/vBAkYuW.png)](https://npm.im/now-secrets)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dotplants/now-secrets/Node%20CI?style=for-the-badge)](https://github.com/dotplants/now-secrets/actions)
[![GitHub](https://img.shields.io/github/license/dotplants/now-secrets?style=for-the-badge)](#license)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/dotplants/now-secrets/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

[English](https://github.com/dotplants/now-secrets/blob/master/README.md) | [日本語](https://github.com/dotplants/now-secrets/blob/master/docs/README.ja.md)

# これは何？

**now-secrets** は .env に基づいて[ZEIT Now](https://zeit.co)のシークレットを自動でアップデートするコマンドを提供します。

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

- `ZEIT_TOKEN` を.env に追加します。
  > トークンは https://zeit.co/account/tokens から作成できます。

```
ZEIT_TOKEN=foobar
OTHER_ENV=hogefuga
```

- `now-secrets` を実行します。

```
now-secrets
```

- If successful, `@{prefix}_{env_key}` has been added.

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

- prefix: package.json 内の `now_secrets.prefix` > now.json 内の `name` > package.json 内の `name`
- scope: now.json 内の `scope` > 個人アカウント

# CLI Usage

### 全てのシークレットを更新

```bash
now-secrets
```

### 追加のみ実行

> ZEIT Now の仕様: 既にあるシークレットを新たに追加しようとした場合はエラーが返ります。

```bash
now-secrets --no-remove
```

### 削除のみ実行

```bash
now-secrets --clean
```

### now.json を更新しない

```bash
now-secrets --no-update-now-json
```

# License

- code: MIT
- icon: [Font Awesome - CC BY 4.0 License](https://fontawesome.com/license/free)
