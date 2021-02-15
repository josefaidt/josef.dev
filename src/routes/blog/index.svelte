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
  const seoProps = {
    title: 'Blog',
    description:
      'Snakes and Sparklers -- Compilation of my thoughts and opinions on all things tech, web development, and oxford commas.',
  }
</script>

<section>
  <h1>Snakes and Sparklers</h1>
  <p>Compilation of my thoughts and opinions on all things tech, web development, and oxford commas.</p>
  <blockquote>"Snakes and Sparklers are the only ones I like." -Kicking Wing, Joe Dirt (2001)</blockquote>

  <h2>Posts</h2>
  <!-- prettier-ignore -->
  {#each query.allPosts as post}
  <a sapper:prefetch href="{post.slug}" aria-labelledby={post._id}>
    <article>
        <!-- need unique ID's, generate with uuid -->
        <h3 id={post._id}>{post.frontmatter.title}</h3>
        <!-- <p>{new Date(post.frontmatter.date).toLocaleDateString()}</p> -->
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
