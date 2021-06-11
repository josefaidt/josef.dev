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

  export let post
</script>

<SEO {...post.metadata} type="article" />
<h1>{post.metadata.title}</h1>
<div class="post-meta">
  <span>
    {post.metadata.date}
  </span>
  <span class="reading-time">{post.metadata.readingTime.text}</span>
</div>
<div class="post-content">
  {@html post.html}
</div>

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
    column-gap: 0.8rem;
  }

  .reading-time {
    font-style: italic;
  }

  .post-content :global(a) {
    text-decoration: underline;
  }

  .post-content :global(h2 a),
  .post-content :global(h3 a),
  .post-content :global(h4 a) {
    color: var(--theme-text);
    text-decoration: none;
  }

  .post-content :global(h2 a:hover),
  .post-content :global(h3 a:hover),
  .post-content :global(h4 a:hover) {
    text-decoration: underline;
  }

  .post-content :global(h3) {
    font-size: larger;
  }

  .post-content :global(h4) {
    font-size: larger;
  }

  :global(.icon.icon-link) {
    background-image: url(/link.svg);
  }
</style>
