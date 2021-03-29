<script context="module">
  export async function load({ page, fetch }) {
    const res = await fetch(`${page.path}.json`)
    const { page: _page } = await res.json()
    return { props: { page: _page } }
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
