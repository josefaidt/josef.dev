# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Astro 5, deployed on Cloudflare with server-side rendering. The site features a blog with MDX posts, a resume section, Spotify integration, and OG image generation.

## Architecture

- **Framework**: Astro 5 with SSR (server output mode)
- **Styling**: TailwindCSS 4 with custom global styles
- **Content**: Content Collections for blog posts with Zod schema validation
- **Deployment**: Cloudflare adapter for edge deployment
- **Package Manager**: pnpm with workspace configuration

### Key Directories

- `src/content/posts/` - Blog posts in Markdown with frontmatter
- `src/pages/api/` - API endpoints (Spotify auth callbacks, OG image generation)
- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layouts (main Layout.astro, MDXLayout.astro)
- `src/lib/` - Utility functions (Spotify SDK integration)
- `scripts/` - Build-time scripts (PDF generation)

### Content Schema

Blog posts use a strict Zod schema defined in `src/content/config.ts`:

- Required: title, description, publishDate
- Optional: tags, updatedDate, heroImage, isArchived, isFeatured

## Development Commands

- `pnpm dev` or `pnpm start` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm check` - Run Astro type checking
- `pnpm generate-resume-pdf` - Generate PDF resume using Puppeteer

## Code Quality Tools

- **Biome**: Linting and formatting (configured in biome.jsonc)
- **Prettier**: Code formatting with Astro/TailwindCSS plugins
- **TypeScript**: Strict configuration extending Astro's strict preset

## Environment Variables

The site requires Spotify API credentials for the /uses page integration:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

## Special Features

- **OG Image Generation**: Dynamic OG images using @vercel/og and Satori
- **Spotify Integration**: Currently playing track display
- **PDF Resume**: Automated PDF generation from markdown resume
- **Custom Theme**: Rouge-based syntax highlighting theme
