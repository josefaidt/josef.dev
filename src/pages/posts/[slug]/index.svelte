<script context="module">
  export const prerender = true
  // export const hydrate = false

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
  import Markdown from '$components/Markdown.svelte'

  export let post
</script>

<SEO {...post.metadata} type="article" card="summary_large_image" />
<h1>{post.metadata.title}</h1>
<div class="post-meta">
  <span>
    {post.metadata.date}
  </span>
  <span class="reading-time">{post.metadata.readingTime.text}</span>
</div>
<Markdown>
  {@html post.html}
</Markdown>

<style>
  h1 {
    --title-font-size: 2rem;
    margin-top: 0.75rem;
    margin-bottom: 0;
    line-height: calc(var(--title-font-size) + 0.2rem);
    font-size: var(--title-font-size);
  }

  .post-meta {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    column-gap: 1rem;
  }

  .reading-time {
    font-style: italic;
  }
</style>
