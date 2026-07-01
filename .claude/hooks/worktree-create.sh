#!/usr/bin/env bash
set -e

INPUT=$(cat)
WORKTREE_NAME=$(echo "$INPUT" | jq -r '.name')
BRANCH_NAME="worktree-${WORKTREE_NAME}"

WORKTREE_PATH="${CLAUDE_PROJECT_DIR}/.claude/worktrees/${WORKTREE_NAME}"

log() { echo "$*" >&2; }

log "Creating worktree '${WORKTREE_NAME}' at ${WORKTREE_PATH} (branch ${BRANCH_NAME} from HEAD)"
git -C "$CLAUDE_PROJECT_DIR" worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME" HEAD >&2

echo "$WORKTREE_PATH"
