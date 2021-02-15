<!-- src/routes/blog/[name].svelte -->
<script context="module">
  export async function load({ page: _page, fetch }) {
    const articleQuery = `
    query PAGE($slug: String!) {
      page(slug: $slug) {
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
      body: JSON.stringify({ query: articleQuery, variables: { slug: _page.params.page.path } }),
    })
    const { data, errors } = await res.json()
    console.log('data', data)
    return { props: { page: data && data.page ? data.page : undefined } }
  }
</script>

<script>
  export let page
</script>

<svelte:head>
  <title>{page.frontmatter.title}</title>
</svelte:head>

<h1>{page.frontmatter.title}</h1>

<!-- <div class="content">
  {@html article.html}
</div> -->
