<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: _page }) {
    const page = await import(`../../content/${_page.params.page}.md`)
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
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let page

  const seoProps = {
    ...page.metadata,
  }
</script>

<SEO {...seoProps} />

<h1>{page.metadata.title}</h1>

<div class="content">
  <svelte:component this="{page.default}" />
</div>
