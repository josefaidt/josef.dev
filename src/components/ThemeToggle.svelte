<script>
  import { getContext } from 'svelte'
  import LightModeIcon from '$icons/light.svg.svelte'
  import DarkModeIcon from '$icons/asleep.svg.svelte'

  const theme = getContext('theme')
  $: toggle = theme?.toggle
  $: current = theme?.current
</script>

<button on:click="{toggle}">
  {#if $current === 'dark'}
    <DarkModeIcon />
  {:else}
    <LightModeIcon />
  {/if}
</button>

<style>
  button {
    cursor: pointer;
    color: var(--theme-text);
    border: 2px solid var(--theme-bg-contrast);
    border-radius: 3px;
    background-color: var(--theme-bg-contrast);
    padding: 0.2rem 0.4rem;
    margin: 0;

    display: flex;
    place-items: center;

    /* width: 40px;
    height: 40px; */

    fill: var(--theme-text);

    /* temporary until icons */
    /* font-weight: bold; */
  }

  button:hover {
    border-color: var(--theme-primary);
  }
</style>
