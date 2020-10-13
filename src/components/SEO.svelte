<script>
  const query = `
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

  export let title = query.meta.title
  export let date
  export let description = query.meta.description
  export let tags = []
  export let keywords = [].concat(query.meta.keywords)
  export let published = false
</script>

<svelte:head>
  <title>{`${query.meta.title} | ${title}`}</title>
  <meta name="description" content="{description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(keywords || tags).join(',')}" />

  <meta property="og:url" content="{window?.location?.href || query.meta.url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description.slice(0, 244)}" />
  <meta property="og:image" content="/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{`@${query.meta.author}`}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description.slice(0, 244)}" />
  <meta name="twitter:image" content="/favicon.png" />
</svelte:head>
