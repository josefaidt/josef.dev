<script context="module">
  export const hydrate = false
  export const prerender = true
  export async function load({ page, fetch, context }) {
    const res = await fetch(`${page.path}.json`)
    const { post } = await res.json()
    return { props: { post } }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let post

  const seoProps = {
    ...post.frontmatter,
  }
</script>

<SEO {...seoProps} />

<h1>{post.frontmatter.title}</h1>

<div class="content">
  {@html post.html}
</div>
