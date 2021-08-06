# josef.dev

⚠️ WARNING: UNDER ACTIVE DEVELOPMENT ⚠️

My new personal site built with [Svelte-Kit](http://kit.svelte.dev/). Svelte-Kit is still in beta, therefore this will change.

## Technologies

- [Svelte](https://svelte.dev)
- [Svelte-Kit](https://kit.svelte.dev)
- GraphQL
- [PanelBear](https://panelbear.com/) for Analytics (yay no more G-analytics)

## Features

- Vercel API Layer: small utility to pull in Vercel serverless functions into Vite dev server for use locally <sup>[1](#1)</sup>
- GraphQL Layer: attached to Vite dev server for availability in dev and build
- GraphQL preprocessor: pulls in data from GraphQL layer before Svelte compiles, allows for static data (no dynamic queries)
- Markdown: I do not care for the mdsvex DX with svelte-kit, it feels like duplicating logic (layouts, etc). This site uses markdown for page content

## Nuances

- <div id="1"></div>Vercel serverless functions are used in conjunction with the static SK adapter in order to deliver api routes without using the Vercel adapter. When using the Vercel adapter static content pages require extra lifting, and can nix interactivity from parent layouts
  - when pulling for local dev, run `yarn dev` in api
- When deploying to Vercel, be sure to remote `"type": "module"` from Vercel layer `package.json`; Vercel can't deploy using ESM and the Vercel Layer Plugin will not work unless the files are in an ESM context like the site project itself.
  - this is automated for now being that `api` is a workspace and `yarn build` will execute the `build` script in every workspace
