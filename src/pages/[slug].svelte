<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch }) {
    const { slug } = params
    const page = await (await fetch(`/${slug}.json`)).json()
    return {
      props: { page },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import Markdown from '$components/Markdown.svelte'

  export let page
</script>

<SEO {...page.metadata} />
<Markdown>
  <h1>{page.metadata.title}</h1>
  {@html page.html}
</Markdown>
