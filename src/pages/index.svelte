<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch }) {
    const fragment = await (await fetch(`/home.json`)).json()
    const featuredResponse = await fetch('/posts/featured.json')
    let featured = await featuredResponse.json()
    if (featuredResponse.status !== 200) {
      console.error('Unable to list featured content', featured.join('\n'))
      featured = []
    }
    return {
      status: 200,
      props: { fragment, featured },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import Markdown from '$components/Markdown.svelte'
  import PostList from './posts/_components/PostList.svelte'
  export let fragment
  export let featured = []
</script>

<SEO title="josef.dev" description="Welcome to josef.dev, a new home." />
<h1>Hello</h1>
<div>
  <Markdown>
    {@html fragment.html}
  </Markdown>
  <!-- <blockquote>
    <q>The power of imagination makes us infinite</q>
    <cite>&ndash; John Muir</cite>
  </blockquote> -->
</div>
{#if featured?.length}
  <section>
    <h2>Featured Content</h2>
    <PostList posts="{featured}" />
  </section>
{/if}

<style>
  h1 {
    margin-bottom: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  blockquote {
    text-align: center;
    font-style: italic;
  }

  q {
    color: var(--colors-text);
  }
</style>
