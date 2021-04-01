<script context="module">
  export const prerender = true

  /**
   * @type { RouteLoad }
   */
  export async function load({ page, fetch, session }) {
    const { posts } = session || {}
    if (posts?.length) {
      const post = posts.find(({ slug }) => slug === page.path)
      if (post) {
        return {
          props: {
            post,
          },
        }
      } else {
        return {
          status: 404,
          error: new Error('Not found'),
        }
      }
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let post

  const seoProps = {
    ...post.frontmatter,
  }
</script>

<SEO {...seoProps} />

<h1>{post.frontmatter.title}</h1>

<div class="content">
  {@html post.html}
</div>
