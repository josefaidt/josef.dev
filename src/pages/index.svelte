<script context="module">
  export const prerender = true

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch }) {
    const fragment = await (await fetch(`/home.json`)).json()
    return {
      status: 200,
      props: { fragment },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import Markdown from '$components/Markdown.svelte'
  export let fragment
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
