// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField } from "astro/config"
import expressiveCode from "astro-expressive-code"
import icon from "astro-icon"
import rouge2 from "./rouge2-modded.json"

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: "server",
  site: "https://josef.dev",
  env: {
    schema: {
      SPOTIFY_CLIENT_ID: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),
      SPOTIFY_REFRESH_TOKEN: envField.string({
        access: "secret",
        context: "server",
      }),
    },
    validateSecrets: true,
  },
  integrations: [
    icon(),
    expressiveCode({
      cascadeLayer: "expressive-code",
      defaultProps: {
        // Enable word wrap by default
        wrap: true,
      },
      themes: [rouge2],
      shiki: {},
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    gfm: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
