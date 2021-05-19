<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  let needed = ['Meta', 'k']
  let keyPair = new Map()
  $: enabled = false
  let input = ''

  function handleKeydown({ key, keyCode }) {
    if (keyCode === 27) {
      keyPair.clear()
      enabled = false
    } else if (!enabled) {
      keyPair.set(key, keyCode)
      if (keyPair.has(needed[0]) && keyPair.has(needed[1])) {
        enabled = true
      }
    }
  }

  function handleKeyUp({ key, keyCode }) {
    keyPair.delete(key, keyCode)
  }

  function onsubmit(event) {
    event.preventDefault()
    enabled = false
    goto(`/${input}`)
  }

  function focus(element) {
    element.focus()
  }
</script>

<svelte:window on:keydown="{handleKeydown}" on:keyup="{handleKeyUp}" />

{#if enabled}
  <div class="overlay">
    <div className="cmdk-container">
      <div class="cmdk">
        <form on:submit="{onsubmit}">
          <input
            type="text"
            placeholder="Where do you want to go?"
            maxlength="32"
            bind:value="{input}"
            use:focus
          />
          <!-- <button on:click="{() => (enabled = false)}">x</button> -->
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cmdk-container {
    max-width: 100%;
  }

  .cmdk {
    background: var(--background);
  }
</style>
