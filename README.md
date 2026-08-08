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

The customer bot supports `/menu` and the **View Menu** inline button. Menu data and
prices are maintained in `packages/core/src/menu.ts` from the supplied menu board.

## Open PR-001

The repository includes an authenticated PR helper that configures `origin`, pushes
the current branch, avoids duplicate pull requests, and opens PR-001 against
`WBNext`:

```bash
gh auth login --hostname github.com --git-protocol https --web
npm run pr:open
```

For non-interactive authentication, use a fine-grained personal access token with
**Contents: read/write** and **Pull requests: read/write** access to this repository:

```bash
printf '%s' "$GH_PAT" | env -u GH_TOKEN -u GITHUB_TOKEN \
  gh auth login --hostname github.com --git-protocol https --with-token
gh auth setup-git --hostname github.com
npm run pr:open
```

Alternatively, run the **Open PR-001** workflow from GitHub Actions and supply the
remote feature branch name. Repository settings must allow GitHub Actions to create
pull requests under **Settings → Actions → General → Workflow permissions**.
