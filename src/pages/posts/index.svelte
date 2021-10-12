<script context="module">
  export const prerender = true
  export const query = [
    `
    query ALL_POSTS(
      $toLocaleDateStringOptions: LocaleDateStringOptions,
      $published: Boolean
    ) {
      allPosts(options:
        { toLocaleDateStringOptions: $toLocaleDateStringOptions, published: $published }
      ) {
        slug
        metadata {
          title
          date
          description
          tags
          readingTime {
            text
          }
        }
      }
    }
  `,
    {
      toLocaleDateStringOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      // TODO: is this possible? receiving "Cannot use 'import.meta' outside a module"
      // published: import.meta.env.PROD,
      published: true,
    },
  ]
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import Article from './_components/article.svelte'
  const posts = query.data.allPosts ?? []

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
          <a href="{post.slug}" aria-labelledby="{index}">
            <Article
              {...post.metadata}
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
