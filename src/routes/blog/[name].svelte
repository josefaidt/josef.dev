<!-- src/routes/blog/[name].svelte -->
<script context="module">
  import useGraphQL from '$hooks/useGraphQL'
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
        html
      }
    }
    `
    const { data } = await useGraphQL(fetch, articleQuery, { slug: page.path })
    return { props: { post: data && data.post ? data.post : undefined } }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let post
  // $: console.log({ post })

  const seoProps = {
    ...post.frontmatter,
  }
</script>

<SEO {...seoProps} />

<h1>{post.frontmatter.title}</h1>

<div class="content">
  {@html post.html}
</div>
