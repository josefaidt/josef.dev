<script context="module">
  import H1 from '../components/h1.svelte'
  import Img from '../components/img.svelte'
  export { H1 as h1 }
  // export { Img as img }
</script>

<script>
  export let title
  export let date

  // $: console.log('LAYOUT FRONTMATTER', title, date)

  const query = `
    query SITE_METADATA_BLOG {
      meta {
        title
      }
    }
  `
</script>

<svelte:head>
  <title>{`${query.meta.title} | ${title}`}</title>
</svelte:head>
<slot />
