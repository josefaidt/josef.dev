<script>
  import { url } from '@roxi/routify'
  const query = `
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

<section>
  <h1>Snakes and Sparklers</h1>
  <p>welcome to the blog</p>
  <h2>Posts</h2>
  <!-- prettier-ignore -->
  {#each query.allPosts as post}
  <a href="{$url(post.slug)}" aria-labelledby={post._id}>
    <article>
        <!-- need unique ID's, generate with uuid -->
        <h2 id={post._id}>{post.frontmatter.title}</h2>
        <p>{new Date(post.frontmatter.date).toLocaleDateString()}</p>
      
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 1rem 0;
    transition: transform 0.3s ease;
    padding: 1rem;
  }

  article:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
</style>
