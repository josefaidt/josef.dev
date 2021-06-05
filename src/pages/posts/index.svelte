<script context="module">
  export const prerender = true
  export const query = `
    query ALL_POSTS {
      allPosts {
        slug
        metadata {
          title
          description
          readingTime {
            text
          }
        }
      }
    }
  `

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
  // export let posts
  $: posts = query?.data?.allPosts ?? []

  const seoProps = {
    title: 'Snakes and Sparklers',
    description:
      'Compilation of my thoughts and opinions on all things tech, web development, and oxford commas.',
  }
</script>

<SEO {...seoProps} />
<section>
  <h1>{seoProps.title}</h1>
  <p>{seoProps.description}</p>
  <blockquote>
    "Snakes and Sparklers are the only ones I like." -Kicking Wing, Joe Dirt
    (2001)
  </blockquote>

  <h2>Posts</h2>
  <ul>
    {#each posts as post, index}
      <li>
        <a href="{post.slug}" aria-labelledby="{index}">
          <article>
            <p id="{index}">{post.metadata.title}</p>
            <div>
              <span>{post.metadata.readingTime.text}</span>
            </div>
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

    --gap: 0.3rem;
    display: grid;
    grid-gap: var(--gap);
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
    margin: 0 calc(var(--article-offset) * -1);
    padding: 0 var(--article-offset);

    transition: all 100ms ease;
  }

  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  article p {
    margin: 0;
    font-weight: 600;
  }

  article span {
    font-size: smaller;
  }

  article:hover {
    --hover: var(--theme-primary);
    background-color: var(--hover);
    color: var(--theme-bg);
    transition: all 100ms ease;
  }

  :global(html[theme='dark']) article {
    box-shadow: initial;
  }

  article h3 {
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }
</style>
