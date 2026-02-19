# Wing⚡Boss vNext Monorepo

This repository now uses **npm workspaces** with TypeScript packages:

- `apps/customer-bot`: Telegraf customer-facing bot scaffold.
- `apps/staff-bot`: Telegraf staff-facing bot scaffold.
- `packages/core`: Shared package placeholder.
- `legacy/`: Preserved original single-bot implementation.

## Install

```bash
npm install
```

## CI commands

```bash
npm run lint
npm run typecheck
npm test
```

## Run bots (long polling)

Customer bot:

```bash
BOT_TOKEN_CUSTOMER=<telegram-token> npm run dev -w @wingboss/customer-bot
```

Staff bot:

```bash
BOT_TOKEN_STAFF=<telegram-token> npm run dev -w @wingboss/staff-bot
```
