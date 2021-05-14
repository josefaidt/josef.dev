<script>
  import { page } from '$app/stores'

  const metadata = {
    title: 'josef',
    url: 'https://josef.dev',
    description: 'Welcome to my personal site',
    keywords: ['josef', 'aidt', 'personal', 'portfolio', 'svelte'],
    author: 'josefaidt',
  }

  export let title = metadata?.title
  export let overrideTitle = false
  export let date
  export let description = metadata?.description || ''
  export let tags = []
  export let keywords = [].concat(metadata?.keywords || [])
  export let published = false
  export let imageUrl = '/favicon.png'
</script>

<svelte:head>
  <title>{`${title}${!overrideTitle && ` | ${metadata?.title}`}`}</title>
  <meta name="description" content="{description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(keywords || tags).join(',')}" />

  <meta property="og:url" content="{$page.path || metadata?.url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description.slice(0, 244)}" />
  <meta property="og:image" content="{imageUrl}" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{`@${metadata?.author}`}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description.slice(0, 244)}" />
  <meta name="twitter:image" content="{imageUrl}" />
</svelte:head>
