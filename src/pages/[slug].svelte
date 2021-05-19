<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: _page, fetch }) {
    const { slug } = _page.params
    const page = await (await fetch(`/${slug}.json`)).json()
    return {
      props: { page },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let page
</script>

<SEO {...page.metadata} />
<h1>{page.metadata.title}</h1>
{@html page.html}
