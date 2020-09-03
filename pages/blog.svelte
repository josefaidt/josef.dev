<script>
  import { url } from '@roxi/routify'
  import { routes } from '../.routify/routes'
  import data from './blog/_data.json'
  export const query = `
    query {
      allPosts {
        frontmatter {
          title
        }
      }
    }
  `
  $: console.log('QUERY', query)

  let posts = routes
    .filter(route => /^\/blog\/[A-z0-9\/\-]*$/gi.test(route.shortPath))
    .map(route => {
      const [, frontmatter] = data.find(([path]) => route.absolutePath === path)
      return Object.assign(route, { frontmatter })
    })
</script>

<section>
  <h1>Blog</h1>
  <p>welcome to the blog</p>
  <h2>Posts</h2>
  <pre>
    <code>{JSON.stringify(query, null, 2)}</code>
  </pre>
  <!-- prettier-ignore -->
  {#each posts as post}
  <article>
    <div>
      <a href="{$url(post.slug)}">{post.frontmatter.title}</a>
      <p>{new Date(post.frontmatter.date).toDateString()}</p>
    </div>
  </article>
{/each}
</section>
