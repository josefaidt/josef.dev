<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const { slug } = page.params
    const post = await fetch(`/posts/${slug}.json`).then(r => r.json())
    return {
      props: { post },
    }
  }
</script>

<script>
  export let post
  const { metadata, content } = post
  // console.log({ content })
  // export let component
  // export let slug
  // console.log($$props)
</script>

<h1>{metadata.title}</h1>
<!-- <svelte:component this="{component}" /> -->
{@html content}
