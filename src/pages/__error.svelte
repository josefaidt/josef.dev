<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status,
        error,
      },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'

  export let status
  export let error

  const seoProps = {
    title: `Error ${status}`,
    description: error.message,
  }
</script>

<SEO {...seoProps} />
<h1>{status}</h1>
<p>{error.message}</p>
<slot />
