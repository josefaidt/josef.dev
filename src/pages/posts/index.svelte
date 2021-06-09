<script context="module">
  export const prerender = true
  export const query = [
    `
    query ALL_POSTS($toLocaleDateStringOptions: LocaleDateStringOptions) {
      allPosts(options:
        { toLocaleDateStringOptions: $toLocaleDateStringOptions}
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
    },
  ]

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  // export async function load({ fetch }) {
  //   const posts = await (await fetch(`posts.json`)).json()
  //   return {
  //     props: { posts },
  //   }
  // }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import Tag from './_tag.svelte'
  // export let posts
  $: posts = query?.data?.allPosts ?? []

  const seoProps = {
    title: 'Snakes and Sparklers',
    description:
      'Compilation of my thoughts and opinions on all things tech, web development, and oxford commas.',
  }
</script>

<SEO {...seoProps} />
<!-- <section>
  <h1>{seoProps.title}</h1>
  <p>{seoProps.description}</p>
  <blockquote>
    <q>Snakes and Sparklers are the only ones I like.</q>
    <cite>&ndash; Kicking Wing, Joe Dirt (2001)</cite>
  </blockquote>
</section> -->
<section>
  <!-- <h2>Posts</h2> -->
  <ul class="post-list">
    {#each posts as post, index (index)}
      <li>
        <a href="{post.slug}" aria-labelledby="{index}">
          <article>
            <div class="post-meta">
              <span>
                {post.metadata.date}
              </span>
              <span class="reading-time">{post.metadata.readingTime.text}</span>
            </div>
            <h3 id="{index}">{post.metadata.title}</h3>
            {#if post.metadata.tags?.length > 0}
              <div>
                <ul class="post-tags">
                  {#each post.metadata.tags as tag, kindex (kindex)}
                    <li><Tag>#{tag}</Tag></li>
                  {/each}
                </ul>
              </div>
            {/if}
          </article>
        </a>
      </li>
    {/each}
  </ul>
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
  article {
    color: var(--theme-text);
    text-decoration: none;
  }

  article {
    --border-color: transparent;
    --article-offset: 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    margin: 0 calc(var(--article-offset) * -1 / 2);
    padding: calc(var(--article-offset) / 1.5) var(--article-offset);

    transition: all 50ms ease;
  }

  @media (min-width: 33rem) {
    article {
      margin: 0 calc(var(--article-offset) * -1);
    }
  }

  article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  article h3 {
    margin: 0;

    font-size: x-large;
    /* padding-top: 0pc; */
    line-height: 1.8rem;
    /* font-weight: 600; */
    /* padding-top for font offset with josefin sans */
    padding-top: 0.2rem;
  }

  @media (min-width: 33rem) {
    article h3 {
      font-size: large;
      line-height: 2.1rem;
    }
  }

  article div.post-meta {
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.8rem;
  }

  article span {
    font-size: smaller;
    line-height: 1.2rem;
  }

  article .reading-time {
    display: none;
    font-style: italic;
  }
  @media (min-width: 33rem) {
    article .reading-time {
      display: inline;
    }
  }

  article ul.post-tags {
    display: none;
    grid-auto-flow: column;
    column-gap: 0.75rem;
  }

  @media (min-width: 33rem) {
    article ul.post-tags {
      display: grid;
    }
  }

  article ul.post-tags li {
    line-height: 1.4rem;
  }

  article:hover {
    /* --hover: var(--theme-primary); */
    --hover: var(--rouge);
    background-color: var(--hover);
    color: var(--theme-bg);
    transition: all 100ms ease;
  }

  :global(html[theme='dark']) article {
    box-shadow: initial;
  }
</style>
