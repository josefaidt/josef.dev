import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import { defineConfig, envField } from "astro/config"
import rouge2 from "./rouge2-modded.json"

// https://astro.build/config
export default defineConfig({
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
  integrations: [icon(), mdx(), sitemap()],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: rouge2,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
