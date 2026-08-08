#!/usr/bin/env bash
set -euo pipefail

repo="${GITHUB_REPOSITORY:-Shakeyswings/wingboss-telegram-bot}"
base="${PR_BASE:-WBNext}"
head="${PR_HEAD:-$(git branch --show-current)}"
title="${PR_TITLE:-PR-001: vNext monorepo scaffold (customer bot + staff bot + core package)}"
body_file="${PR_BODY_FILE:-.github/pr-001-body.md}"
remote_url="https://github.com/${repo}.git"

fail() {
  printf 'PR setup error: %s\n' "$1" >&2
  exit 1
}

command -v git >/dev/null 2>&1 || fail "git is not installed."
command -v gh >/dev/null 2>&1 || fail "GitHub CLI is not installed. See https://cli.github.com/."
[[ -n "$head" ]] || fail "the repository is in detached HEAD state; set PR_HEAD explicitly."
[[ "$head" != "$base" ]] || fail "head and base are both '$base'; create or switch to a feature branch first."
[[ -f "$body_file" ]] || fail "PR body file '$body_file' does not exist."

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$remote_url"
  printf 'Configured origin: %s\n' "$remote_url"
fi

if ! gh auth status --hostname github.com >/dev/null 2>&1; then
  fail "GitHub CLI is not authenticated. Run 'gh auth login --hostname github.com --git-protocol https --web', then rerun this command."
fi

gh auth setup-git --hostname github.com
git push --set-upstream origin "$head"

existing_url="$(gh pr list --repo "$repo" --base "$base" --head "$head" --state open --json url --jq '.[0].url // empty')"
if [[ -n "$existing_url" ]]; then
  printf 'An open PR already exists: %s\n' "$existing_url"
  exit 0
fi

gh pr create \
  --repo "$repo" \
  --base "$base" \
  --head "$head" \
  --title "$title" \
  --body-file "$body_file"
