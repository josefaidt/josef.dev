<script context="module">
  export const query = `
    query SITE_METADATA {
      metadata {
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
  export let title = query?.data?.metadata?.title
  export let date
  export let description = query?.data?.metadata?.description || ''
  export let tags = []
  export let keywords = [].concat(query?.data?.metadata?.keywords || [])
  export let published = false
  export let imageUrl = '/favicon.png'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(keywords || tags).join(',')}" />

  <meta
    property="og:url"
    content="{$page.path || query?.data?.metadata?.url}"
  />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description.slice(0, 244)}" />
  <meta property="og:image" content="{imageUrl}" />

  <meta name="twitter:card" content="summary" />
  <meta
    name="twitter:creator"
    content="{`@${query?.data?.metadata?.author}`}"
  />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description.slice(0, 244)}" />
  <meta name="twitter:image" content="{imageUrl}" />
</svelte:head>
