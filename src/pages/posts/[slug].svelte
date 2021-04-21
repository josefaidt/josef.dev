<script context="module">
  import { get } from './_posts'

  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: _page, fetch, session, context }) {
    const page = await get(`/posts/${_page.params.slug}`)
    if (!page) {
      return {
        code: 404,
      }
    }
    return {
      props: {
        ...page,
      },
    }
  }
</script>

<script>
  export let metadata
  export let component
  export let slug
  console.log($$props)
</script>

<h1>{metadata.title}</h1>
<svelte:component this="{component}" />
