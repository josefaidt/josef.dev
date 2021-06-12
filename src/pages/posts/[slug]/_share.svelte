<script>
  import { onMount } from 'svelte'
  import Draggable from '$components/Draggable.svelte'

  export let title
  export let url
  export let text

  let supported
  onMount(() => {
    supported = navigator.share
  })

  async function share(event) {
    if (supported) {
      try {
        await navigator?.share({
          title,
          url: url ?? location?.href,
          text,
        })
      } catch (error) {
        console.error('Unable to share post', error)
      }
    } else {
      console.warn('Share API is not available')
    }
  }
</script>

<!-- {#if supported} -->
<Draggable bottom="{60}" right="{50}">
  <button on:click="{share}">share</button>
</Draggable>

<!-- {/if} -->
<style>
  button {
    margin: 0;
    padding: 0;
  }
</style>
