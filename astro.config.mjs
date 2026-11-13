// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import { defineConfig, envField } from "astro/config"

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
  integrations: [icon(), mdx(), sitemap()],
  vite: {
    optimizeDeps: {
      include: ["@iconify/utils", "@iconify-json/simple-icons", "@iconify-json/gg"],
    },
    plugins: [tailwindcss()],
  },
})
