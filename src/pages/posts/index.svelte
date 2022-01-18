<script context="module">
  export const prerender = true
  // export const hydrate = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const posts = await (await fetch(`/posts.json`)).json()
    return {
      props: { posts },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import PostList from './_components/PostList.svelte'

  export let posts = []

  const seoProps = {
    title: 'Snakes and Sparklers',
    description:
      'Compilation of my thoughts and opinions on all things tech, web development, and oxford commas.',
  }
</script>

<SEO {...seoProps} />
<section>
  {#if posts.length}
    <PostList posts="{posts}" />
  {/if}
</section>
