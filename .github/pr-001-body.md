## Summary

- Converts the repository to an npm-workspaces TypeScript monorepo.
- Preserves the original implementation under `legacy/`.
- Adds customer and staff Telegraf bot scaffolds using long polling.
- Adds the shared `@wingboss/core` package with the audited menu and pricing.
- Adds deterministic CI for lint, typecheck, and tests without bot tokens.

## Run commands

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Customer bot:

```bash
BOT_TOKEN_CUSTOMER=<telegram-token> npm run dev -w @wingboss/customer-bot
```

Staff bot:

```bash
BOT_TOKEN_STAFF=<telegram-token> npm run dev -w @wingboss/staff-bot
```

## Manual test checklist

- [ ] Customer bot exits clearly when `BOT_TOKEN_CUSTOMER` is missing.
- [ ] Staff bot exits clearly when `BOT_TOKEN_STAFF` is missing.
- [ ] Customer `/start` displays **Ping** and **View Menu**.
- [ ] **Ping** returns **Pong**.
- [ ] `/menu` and **View Menu** display the audited menu and pricing.
- [ ] Staff `/start` displays **Queue**.
- [ ] **Queue** returns the queue stub response.
- [ ] Both bots use long polling only.
