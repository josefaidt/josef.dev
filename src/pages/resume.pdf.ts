import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = () => {
  return Response.redirect("/josefaidt_resume.pdf", 301)
}
