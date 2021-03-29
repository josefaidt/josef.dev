<script context="module">
  export const query = `
    query ALL_POSTS {
      allPosts(data:{}) {
        _id
        slug
        frontmatter {
          title
          date
          published
          tags
        }
      }
    }
  `
</script>

<script>
  import SEO from '$components/SEO.svelte'
  $: posts = query?.allPosts
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
    "Snakes and Sparklers are the only ones I like." -Kicking Wing, Joe Dirt (2001)
  </blockquote>

  <h2>Posts</h2>
  {#each posts as post}
    <a sveltekit:prefetch href="{post.slug}" aria-labelledby="{post._id}">
      <article>
        <h3 id="{post._id}">{post.frontmatter.title}</h3>
      </article>
    </a>
  {/each}
</section>

<style>
  a,
  article {
    color: var(--theme-text);
    text-decoration: none;
  }

  article {
    box-shadow: 0 4px 8px 0 var(--theme-shadow);
    border: 1px solid var(--theme-shadow);
    border-radius: 5px;
    margin: 1rem 0;
    transition: all 0.3s ease;
    padding: 1rem;
  }

  article:hover {
    box-shadow: 0 8px 16px 0 var(--theme-shadow);
    /* transform: translateY(-5px); */
  }

  :global(html[theme='dark']) article {
    box-shadow: initial;
  }

  article h3 {
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }
</style>
