import type { APIRoute } from "astro"
import {
  SITE_DESCRIPTION,
  SITE_OWNER,
  SITE_OWNER_PROJECTS,
  SITE_OWNER_SOCIALS,
  SITE_TITLE,
} from "../constants"

// Nothing here changes per request, so it ships as a static file instead of running in the Worker
export const prerender = true

const link = (name: string, url: string, note?: string) =>
  note ? `- [${name}](${url}): ${note}` : `- [${name}](${url})`

/**
 * The /llms.txt summary of the site, in the format from https://llmstxt.org. It reads the same
 * constants as the pages, so it stays in step with them. A string body already gets a
 * `text/plain` content type, in dev and as a static asset.
 */
export const GET: APIRoute = () => {
  const body = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `The personal site of ${SITE_OWNER}. In a browser that supports WebMCP, the \`get_socials\` tool returns the same social links listed here.`,
    "",
    "## Socials",
    "",
    ...SITE_OWNER_SOCIALS.map((social) => link(social.name, social.url)),
    "",
    "## Pages",
    "",
    link(
      "Uses",
      new URL("/uses", import.meta.env.SITE).href,
      `gear and software ${SITE_OWNER} uses daily`,
    ),
    "",
    "## Projects",
    "",
    ...SITE_OWNER_PROJECTS.map((project) => link(project.name, project.url, project.description)),
    "",
  ].join("\n")

  return new Response(body)
}
