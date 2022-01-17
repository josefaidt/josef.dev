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
  import Article from './_components/article.svelte'
  
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
    <ul class="post-list">
      {#each posts as post, index (index)}
        <li>
          <a href="{post.slug}" aria-labelledby="{index}" sveltekit:prefetch>
            <Article
              {...(post.metadata || {})}
              readingTime="{post.metadata?.readingTime?.text}"
            />
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
  ul.post-list {
    --gap: 1rem;
    display: grid;
    grid-gap: var(--gap);
  }

  @media (min-width: 33rem) {
    ul.post-list {
      --gap: 1.3rem;
    }
  }

  a,
  a:hover {
    text-decoration: none;
  }
</style>
