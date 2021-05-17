<script context="module">
  export const prerender = true
  export const hydrate = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: _page, fetch }) {
    const { slug } = _page.params
    const page = await fetch(`/${slug}.json`).then(r => r.json())
    return {
      props: { page },
    }
  }
</script>

<script>
  export let page
</script>

<h1>{page.metadata.title}</h1>
{@html page.html}
