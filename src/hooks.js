import fetch from 'node-fetch'
// import { browser as isBrowser } from '$app/env'

async function useGraphQL(query, variables) {
  const port = 3000
  // const endpoint = isBrowser ? `/graphql` : `http://localhost:${port}/___graphql`
  const endpoint = `http://localhost:${port}/___graphql`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const parsed = await response.json()
  return parsed
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ context }) {
  const postsQuery = `
    query ALL_POSTS {
      allPosts(data:{}) {
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

  const pagesQuery = `
    query ALL_PAGES {
      allPages {
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

  return {
    posts: (await useGraphQL(postsQuery))?.data?.allPosts || [],
    pages: (await useGraphQL(pagesQuery))?.data?.allPages || [],
  }
}
