import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import rouge2 from "./rouge2-modded.json"

// https://astro.build/config
export default defineConfig({
  site: "https://josef.dev",
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
