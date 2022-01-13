# josef.dev

⚠️ WARNING: UNDER ACTIVE DEVELOPMENT ⚠️

My new personal site built with [Svelte-Kit](http://kit.svelte.dev/). Svelte-Kit is still in beta, therefore this will change.

## Technologies

- [Svelte](https://svelte.dev)
- [Svelte-Kit](https://kit.svelte.dev)
- GraphQL
- [PanelBear](https://panelbear.com/) for Analytics (yay no more G-analytics)
- GitHub (-as-a-CMS)

## Features

- [Vercel API Layer](packages/plugin-vercel): small utility to pull in Vercel serverless functions into Vite dev server for use locally -- **no longer used in favor of the Vercel adapter**
- GraphQL Layer: attached to Vite dev server for availability in dev and build
- GraphQL preprocessor: pulls in data from GraphQL layer before Svelte compiles, allows for static data (no dynamic queries)
- Markdown
- GitHub-as-a-CMS, uses [GitHub issues in this repository](https://github.com/josefaidt/josef.dev/issues) as content
