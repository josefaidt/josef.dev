import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import rouge2 from "./rouge2-modded.json"

// https://astro.build/config
export default defineConfig({
  site: "https://josef.dev",
  integrations: [
    icon(),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: rouge2,
      wrap: true,
    },
  },
})
