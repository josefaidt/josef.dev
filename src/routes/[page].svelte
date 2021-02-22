<script context="module">
  export async function load({ page, fetch }) {
    const pageQuery = `
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
    console.log('PAGE PATH', page.path)
    const res = await fetch(`http://localhost:3000/___graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: pageQuery, variables: { slug: page.path } }),
    })
    const { data, errors } = await res.json()
    return { props: { page: data && data.page ? data.page : undefined } }
  }
</script>

<script>
  export let page
  $: console.log({ page })
</script>

<svelte:head>
  <title>{page.frontmatter.title}</title>
</svelte:head>

<h1>{page.frontmatter.title}</h1>

<!-- <div class="content">
  {@html article.html}
</div> -->
