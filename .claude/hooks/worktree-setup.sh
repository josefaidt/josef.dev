#!/usr/bin/env bash
set -e

INPUT=$(cat)
NAME=$(echo "$INPUT" | jq -r '.tool_input.name // empty')

# EnterWorktree with `path` switches into an existing worktree — nothing to set up
if [ -z "$NAME" ]; then
  exit 0
fi

WORKTREE_PATH=$(echo "$INPUT" | jq -r '.tool_response.worktreePath')
cd "$WORKTREE_PATH"

if bun install --silent && bunx astro sync >/dev/null 2>&1; then
  echo "{\"systemMessage\": \"Worktree '${NAME}' ready: deps installed, astro synced.\"}"
else
  echo "{\"systemMessage\": \"Worktree '${NAME}' setup failed (bun install / astro sync) — check manually.\"}"
  exit 1
fi
