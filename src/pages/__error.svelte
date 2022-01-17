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
  import CodeSnippet from '$components/CodeSnippet.svelte'

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
{#if error.status !== 404}
  <CodeSnippet>{error.stack}</CodeSnippet>
{/if}
<slot />
