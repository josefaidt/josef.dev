import fetch from 'node-fetch'
export default async function useGraphQL(query, variables) {
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
