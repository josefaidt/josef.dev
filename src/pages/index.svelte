<script context="module">
  export const query = `
    query GET_HOMEPAGE_FRAGMENT {
      page(slug: "/") {
        html
      }
    }
  `
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import Markdown from '$components/Markdown.svelte'
</script>

<SEO title="josef.dev" description="Welcome to josef.dev, a new home." />
<h1>Hello</h1>
<div>
  <Markdown>
    {@html query.data.page.html}
  </Markdown>
  <blockquote>
    <q>The power of imagination makes us infinite</q>
    <cite>&ndash; John Muir</cite>
  </blockquote>
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
    margin: auto;
    margin-bottom: 3rem;

    text-align: center;
    font-style: italic;
  }

  q {
    color: var(--colors-text);
  }
</style>
