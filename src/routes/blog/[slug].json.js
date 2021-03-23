// import fetch from 'isomorphic-unfetch'
import { browser as isBrowser } from '$app/env'
export async function get(req, context) {
  const articleQuery = `
    query POST($slug: String!) {
      post(slug: $slug) {
        _id
        slug
        frontmatter {
          title
          date
          published
          tags
        }
        html
      }
    }
    `
  // the `slug` parameter is available because this file
  // is called [name].json.js
  console.log('REQ', req)
  const { slug } = req.params

  const fetch = isBrowser ? window.fetch : await import('node-fetch')
  console.log('fetch is', fetch, isBrowser)

  const res = await fetch(`http://localhost:3000/___graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: articleQuery,
      variables: { slug: req.path.replace(/\.json$/, '') },
    }),
  })
  const { data, errors } = await res.json()
  const { post } = data || {}

  if (post) {
    return {
      body: {
        post,
      },
    }
  } else {
    return {
      body: {
        errors,
      },
    }
  }
}
