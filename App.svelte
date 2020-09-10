<script>
  import { Router } from '@roxi/routify'
  import info from './app.config'
  import { routes } from './.routify/routes'
  import ThemeProvider from './components/ThemeProvider'
</script>

<svelte:head>
  <title>{info.title}</title>
  <meta name="description" content="{info.description.slice(0, 244)}" />
  <meta name="keywords" content="{[].concat(info.keywords).join(',')}" />

  <meta property="og:url" content="{info.url}" />
  <meta property="og:title" content="{info.title}" />
  <meta property="og:description" content="{info.description.slice(0, 244)}" />
  <meta property="og:image" content="/favicon.png" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="{`@${info.author}`}" />
  <meta name="twitter:title" content="{info.title}" />
  <meta name="twitter:description" content="{info.description.slice(0, 244)}" />
  <meta name="twitter:image" content="/favicon.png" />
</svelte:head>

<!-- <ThemeProvider> -->
<Router routes="{routes}" />
<!-- </ThemeProvider> -->
