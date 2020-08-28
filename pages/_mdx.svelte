<script context="module">
  import H1 from '../components/h1.svelte'
  export { H1 as h1 }
</script>

<script>
  import info from '../app.config'
  export let title
  export let date

  $: console.log('LAYOUT FRONTMATTER', title, date)
</script>

<svelte:head>
  <title>{`${info.name} | ${title}`}</title>
</svelte:head>
<slot />
