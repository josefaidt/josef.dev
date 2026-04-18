// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import expressiveCode from "astro-expressive-code"
import icon from "astro-icon"
import { defineConfig, envField } from "astro/config"
import expressiveCodeTwoSlash from "expressive-code-twoslash"
import rouge2 from "./rouge2-modded.json"

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: { build: "compile", runtime: "cloudflare-binding" },
  }),
  output: "server",
  site: "https://josef.dev",
  env: {
    schema: {
      SPOTIFY_CLIENT_ID: envField.string({
        access: "secret",
        context: "server",
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        access: "secret",
        context: "server",
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
    react(),
    expressiveCode({
      cascadeLayer: "expressive-code",
      themes: [rouge2],
      plugins: [expressiveCodeTwoSlash()],
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
