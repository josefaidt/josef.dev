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
  import Article from './_article.svelte'
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
          <Article
            {...post.metadata}
            readingTime="{post.metadata.readingTime.text}"
          />
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

  a {
    text-decoration: none;
  }
</style>
