import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = ({ url }) => {
  const redirectUrl = new URL("/josefaidt_resume.pdf", url.origin)
  return Response.redirect(redirectUrl, 301)
}
