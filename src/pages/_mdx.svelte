<script context="module">
  import H1 from '../components/h1.svelte'
  import Img from '../components/img.svelte'
  export { H1 as h1 }
  // export { Img as img }
</script>

<script>
  import SEO from '../components/SEO.svelte'
</script>

<SEO {...$$restProps} />
<slot />
