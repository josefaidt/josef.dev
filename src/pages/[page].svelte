<script context="module">
  export const prerender = true

  /**
   * @type { RouteLoad }
   */
  export async function load({ page: _page, fetch, session }) {
    const { pages } = session || {}
    if (pages?.length) {
      const page = pages.find(({ slug }) => slug === _page.path)
      if (page) {
        return {
          props: {
            page,
          },
        }
      } else {
        return {
          status: 404,
          error: new Error('Not found'),
        }
      }
    }
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
