<!-- src/routes/blog/[name].svelte -->
<script context="module">
  export async function load({ page, fetch }) {
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
      }
    }
    `
    const res = await fetch(`http://localhost:3000/___graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: articleQuery, variables: { slug: page.path } }),
    })
    const { data, errors } = await res.json()
    console.log({ data })
    return { props: { post: data && data.post ? data.post : undefined } }
  }
</script>

<script>
  export let post
</script>

<svelte:head>
  <title>{post.frontmatter.title}</title>
</svelte:head>

<h1>{post.frontmatter.title}</h1>

<!-- <div class="content">
  {@html article.html}
</div> -->
