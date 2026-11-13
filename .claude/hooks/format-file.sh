#!/usr/bin/env bash
# Formats the file an Edit or Write just changed, so the agent reads formatted code back and never
# runs the formatter itself. The pre-commit hook still checks anything a shell command wrote.
set -euo pipefail

input="$(cat)"
cwd="$(printf '%s' "$input" | jq -r '.cwd // empty')"
file="$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')"
root="$(git -C "${cwd:-.}" rev-parse --show-toplevel 2>/dev/null)" || exit 0
# a file outside this checkout, such as one in the scratchpad, is not this repo's to format
[[ -n $file && $file == "$root"/* ]] || exit 0
cd "$root"
# a file mid-edit may not parse yet, and oxfmt skips file types it does not support
bun x oxfmt --no-error-on-unmatched-pattern "$file" >/dev/null 2>&1 || true
