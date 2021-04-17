<script context="module">
  export const prerender = true
</script>

<script>
  import SEO from '$components/SEO.svelte'
</script>

<SEO {...$$props} />

<slot />
