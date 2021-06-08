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
<span>{post.metadata.date}</span>
<!-- <svelte:component this="{component}" /> -->
{@html post.html}

<style>
  h1 {
    --font-size: 2rem;
    margin-bottom: 0;
    line-height: calc(var(--font-size) + 0.2rem);
    font-size: var(--font-size);
  }
</style>
