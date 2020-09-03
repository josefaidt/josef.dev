<script>
  import { url, page, metatags } from '@roxi/routify'
  // const query = [`
  //   query POST($slug: String!) {
  //     findPost(input: {
  //       slug: $slug
  //     }) {
  //       frontmatter {
  //         title
  //         date
  //         tags
  //         published
  //       }
  //     }
  //   }
  // `, {
  //   slug: $page.path.replace(/\/index$/, '')
  // }]
</script>

<article>
  <a href="{$url('/blog')}">Go back</a>
  <slot />
</article>

<style>
  article {
    background-color: powderblue;
    color: black;
  }
</style>
