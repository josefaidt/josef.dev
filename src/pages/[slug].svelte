<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch }) {
    const { slug } = params
    const response = await fetch(`/${slug}.json`)
    const page = await response.json()
    if (response.status !== 200) {
      return {
        status: response.status,
        error: page.errors[0]?.message || 'Uh oh',
      }
    }

    return {
      status: response.status,
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
