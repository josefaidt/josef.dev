<script context="module">
  import useGraphQL from '$hooks/useGraphQL'
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
        html
      }
    }
    `
    const { data } = await useGraphQL(fetch, pageQuery, { slug: page.path })
    return { props: { page: data && data.page ? data.page : undefined } }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  export let page
  const seoProps = {
    ...page.frontmatter,
  }
</script>

<SEO {...seoProps} />

<h1>{page.frontmatter.title}</h1>

<div class="content">
  {@html page.html}
</div>
