---
name: release
description: Cut a release of the project -- deploys to cloudflare, handles rollbacks, push to tag, and release notes
---

# Release

Trigger a release via the GitHub Actions release workflow. The workflow handles version bumping, tagging, deploying, creating release notes, and rolling back on failure.

## Steps

1. Determine the bump type from the user's request. Default to `minor` if unspecified. Valid values: `patch`, `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`.

2. Run the release workflow:

   ```bash
   gh workflow run release --field bump=<bump>
   ```

3. Report back the command that was run and remind the user they can monitor progress at:

   ```bash
   gh run list --workflow=release --limit 1
   ```

## Notes

- The workflow runs CI, bumps the version in package.json, pushes a tag, creates a draft GitHub release with auto-generated notes, deploys to Cloudflare, then publishes the release.
- If CI or deploy fails after the version bump, the workflow's cleanup job automatically deletes the draft release, reverts the commit on main, and removes the tag.
- Do not manually push tags or edit package.json — the workflow owns that.
