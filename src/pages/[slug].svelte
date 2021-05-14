<script context="module">
  import { get } from './_pages'

  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: _page, fetch, session, context }) {
    const page = await get(`/${_page.params.slug}`)
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
  export let content
  // export let metadata
  // export let component
  // export let slug
  // console.log('props', $$props)
</script>

<h1>hello from page slug template</h1>
<!-- <svelte:component this="{component}" /> -->
{@html content}
