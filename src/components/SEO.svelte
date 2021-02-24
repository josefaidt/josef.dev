<script context="module">
  export const query = `
    query SITE_METADATA_BLOG {
      meta {
        title
        url
        description
        keywords
        author
      }
    }
  `
</script>

<script>
  import { page } from '$app/stores'

  export let title = query.meta.title
  export let date
  export let description = query.meta.description
  export let tags = []
  export let keywords = [].concat(query.meta.keywords)
  export let published = false
</script>

<svelte:head>
  <title>{`${title} | ${query.meta.title}`}</title>
  <meta name="description" content="{description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(keywords || tags).join(',')}" />

  <meta property="og:url" content="{$page.path || query.meta.url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description.slice(0, 244)}" />
  <meta property="og:image" content="/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{`@${query.meta.author}`}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description.slice(0, 244)}" />
  <meta name="twitter:image" content="/favicon.png" />
</svelte:head>
