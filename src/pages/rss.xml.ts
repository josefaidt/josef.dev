import type { APIRoute } from "astro"
import { default as rss } from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_DESCRIPTION, SITE_TITLE } from "../constants"

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts")
  const site = context.site
  if (!site) {
    throw new Error(
      'Unable to generate RSS due to missing "site" configuration',
    )
  }
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/posts/${post.slug}/`,
    })),
  })
}
