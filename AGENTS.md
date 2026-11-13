# josef.dev

Personal landing page built with Astro 7 + Cloudflare Workers (SSR). Deployed via Wrangler to `josef.dev`.

## Stack

- **Astro 7**: server output mode, `@astrojs/cloudflare` adapter
- **Route caching**: the homepage calls `Astro.cache.set()`, and the adapter's experimental `cacheCloudflare()` provider caches it at Cloudflare. Caching does nothing in `bun dev`, so check it with `bun run preview`
- **TailwindCSS 4**: Vite plugin, custom rouge color scale + dark/light theme vars in `src/styles/global.css`
- **astro-icon**: `simple-icons` and `gg` icon sets
- **Package manager**: bun (version in `.bun-version`). `bunfig.toml` pins exact versions, skips versions published less than 3 days ago, and uses the hoisted linker (see the comment there for why)

## Key directories

```
src/
  components/       # BaseHead, Header, Footer, CurrentlyPlaying, Logo, HeaderLink
  layouts/          # Layout.astro, MDXLayout.astro
  lib/spotify.ts    # Spotify Web API wrapper for the currently-playing ticker
  pages/
    index.astro     # landing page: logo, socials, currently playing
    uses.mdx
    api/auth/       # Spotify OAuth callback
  styles/global.css
  constants.ts      # SITE_TITLE, SITE_DESCRIPTION, socials, projects
```

Socials render from `SITE_OWNER_SOCIALS` in `src/constants.ts`, on the landing page and in the footer. Each `name` lowercased must be a `simple-icons` icon name.

There are no posts. The blog was removed; its content is in git history.

## Commands

```sh
bun dev            # dev server
bun run build      # production build
bun run preview    # build + wrangler dev (local Worker)
bun run check      # astro type check
bun run lint       # oxlint, warnings fail
bun run fmt        # oxfmt, writes
bun run fmt:check  # oxfmt, checks only
bun run deploy     # wrangler deploy to Cloudflare
```

Before calling a change done, run `bun run fmt:check`, `bun run lint`, `bun run check`, and `bun run build`. CI runs the same four on every pull request.

## Environment variables

Defined via Astro env schema in `astro.config.mjs`, all server-secret, and validated at build time:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

Locally they come from `.env.local`. CI builds with placeholders, since no page is prerendered and the build never calls Spotify.

## Linting and formatting

oxlint (`.oxlintrc.jsonc`) and oxfmt (`.oxfmtrc.jsonc`). The lint rules are a lean subset of keyhaw's, without type-aware rules. The pre-commit hook in `.git-hooks/` checks staged files and fixes nothing; `bun install` points git at it through the `prepare` script. A Claude Code hook formats each file an agent edits.

## Releases and deployment

Cut a release with the `release` skill, which runs the release workflow. It bumps the version, tags, deploys to Cloudflare, and publishes release notes. Wrangler config is in `wrangler.jsonc`. Routes: `josef.dev` and `www.josef.dev` as custom domains on Cloudflare zone `josef.dev`.
