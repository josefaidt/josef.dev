<!-- src/routes/blog/[name].svelte -->
<script context="module">
  // import { browser as isBrowser } from '$app/env'
  // import useGraphQL from '$hooks/useGraphQL'
  // let post
  // if (!isBrowser) {
  //   ;(async () => {
  //     // const useGraphQL = await import('$hooks/useGraphQL')
  //     const articleQuery = `
  //     query POST($slug: String!) {
  //       post(slug: $slug) {
  //         _id
  //         slug
  //         frontmatter {
  //           title
  //           date
  //           published
  //           tags
  //         }
  //         html
  //       }
  //     }
  //     `
  //     const res = await useGraphQL(articleQuery, { slug: page.path })
  //     post = res?.data?.post
  //   })()
  // }

  // export async function load({ page, fetch }) {
  //   const res = await fetch(`${page.path}.json`)
  //   const { post, errors } = await res.json()
  //   // console.log(data)
  //   // const { post } = await useGraphQL(fetch, articleQuery, { slug: page.path })
  //   return { props: { post } }
  // }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let post
  $: console.log({ post })

  const seoProps = {
    // ...post.frontmatter,
  }
</script>

<SEO {...seoProps} />

<h1>{post.frontmatter.title}</h1>

<div class="content">
  {@html post.html}
</div>
