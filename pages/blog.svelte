<script>
  import { url } from '@roxi/routify'
  const query = `
    query {
      allPosts {
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
    <article>
      <div>
        <a href="{$url(post.slug)}">{post.frontmatter.title}</a>
        <p>{new Date(post.frontmatter.date).toDateString()}</p>
      </div>
    </article>
  {/each}
</section>
