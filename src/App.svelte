<script>
  import { Router } from '@roxi/routify/runtime'
  import { routes } from '../.routify/routes'
  import SEO from './components/SEO.svelte'
  const query = `
    query SITE_METADATA {
      meta {
        title
        url
        description
        keywords
        author
      }
    }
  `

  const seoProps = { ...query.meta }
</script>

<!-- <svelte:head>
  <title>{query.meta.title}</title>
  <meta name="description" content="{query.meta.description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(query.meta.keywords).join(',')}" />

  <meta property="og:url" content="{query.meta.url}" />
  <meta property="og:title" content="{query.meta.title}" />
  <meta property="og:description" content="{query.meta.description.slice(0, 244)}" />
  <meta property="og:image" content="/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{`@${query.meta.author}`}" />
  <meta name="twitter:title" content="{query.meta.title}" />
  <meta name="twitter:description" content="{query.meta.description.slice(0, 244)}" />
  <meta name="twitter:image" content="/favicon.png" />
</svelte:head> -->

<!-- <ThemeProvider> -->
<Router routes="{routes}" />
<!-- </ThemeProvider> -->
