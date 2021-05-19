<script context="module">
  export const prerender = true
  export const hydrate = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const { slug } = page.params
    const post = await (await fetch(`/posts/${slug}.json`)).json()
    return {
      props: { post },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let post
</script>

<SEO {...post.metadata} />
<h1>{post.metadata.title}</h1>
<!-- <svelte:component this="{component}" /> -->
{@html post.html}
