# josef.dev

Personal website built with Astro 6 + Cloudflare Workers (SSR). Deployed via Wrangler to `josef.dev`.

## Stack

- **Astro 6** — server output mode, Cloudflare adapter
- **TailwindCSS 4** — Vite plugin, custom rouge color scale + dark/light theme vars in `src/styles/global.css`
- **Expressive Code** — syntax highlighting with TwoSlash support, rouge2 custom theme (`rouge2-modded.json`)
- **Package manager**: bun (not pnpm — `bun.lock` present)

## Key directories

```
src/
  components/       # BaseHead, Header, Footer, CurrentlyPlaying, Logo, etc.
  content/posts/    # Blog posts as .md files
  content.config.ts # Zod schema for posts collection
  layouts/          # Layout.astro, MDXLayout.astro
  lib/spotify.ts    # Spotify Web API SDK wrapper
  pages/
    index.astro
    posts/[slug].astro
    posts/index.astro
    uses.mdx
    api/auth/       # Spotify OAuth callback
    rss.xml.ts
  styles/global.css
  constants.ts      # SITE_TITLE, SITE_DESCRIPTION, socials, projects
```

## Content schema (`src/content.config.ts`)

Posts frontmatter — required: `title`, `description`, `publishDate`. Optional: `tags`, `updatedDate`, `heroImage`, `isArchived` (default false), `isFeatured` (default false).

## Commands

```sh
bun dev          # dev server
bun run build    # production build
bun run preview  # build + wrangler dev (local Worker)
bun run check    # astro type check
bun run deploy   # wrangler deploy to Cloudflare
bun run fmt      # oxfmt format
bun run lint     # oxlint
```

## Environment variables

Defined via Astro env schema in `astro.config.mjs`, all server-secret:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

## Linting / formatting

oxlint + oxfmt (not Biome/Prettier). Config in `biome.jsonc` may be stale — the active tools are `oxlint` and `oxfmt`.

## Deployment

Wrangler config in `wrangler.jsonc`. Routes: `josef.dev` and `www.josef.dev` as custom domains on Cloudflare zone `josef.dev`.
