<script context="module">
  export const query = `
    query SITE_METADATA {
      metadata {
        title
        url
        description
        keywords
        author
        handle
      }
    }
  `
</script>

<script>
  import { page } from '$app/stores'
  export let title = query.data.metadata.title
  export let date
  export let description = query.data.metadata.description || ''
  export let tags = []
  export let keywords = [].concat(query.data.metadata.keywords || [])
  export let author = query.data.metadata.author
  export let imageUrl = '/favicon.ico'
  export let type = 'website'
  export let card = 'summary'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content="{author}" />
  <meta name="copyright" content="{author}" />
  <meta name="description" content="{description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(keywords || tags).join(',')}" />

  <meta
    name="og:url"
    content="{$page.url.pathname || query.data.metadata.url}"
  />
  <meta name="og:title" content="{title}" />
  <meta name="og:description" content="{description.slice(0, 244)}" />
  <meta name="og:image" content="{imageUrl}" />
  <meta name="og:type" content="{type}" />

  <meta name="twitter:card" content="{card}" />
  <meta name="twitter:creator" content="{`@${query.data.metadata.handle}`}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description.slice(0, 244)}" />
  <meta name="twitter:domain" content="{query.data.metadata.url}" />
  <meta name="twitter:image" content="{imageUrl}" />
</svelte:head>
