<script>
  import { getContext } from 'svelte'
  // import LightModeIcon from './icons/sun.svg'
  // import DarkModeIcon from './icons/moon.svg'
  const { current, toggle } = getContext('theme')
</script>

<button on:click="{toggle}">
  {#if $current === 'light'}
    <!-- {@html LightModeIcon} -->
    light
  {:else if $current === 'dark'}
    <!-- {@html DarkModeIcon} -->
    dark
  {:else}
    <!-- {@html LightModeIcon} -->
    light
  {/if}
</button>

<style>
  button {
    cursor: pointer;
    color: var(--theme-text);
    border: 2px solid transparent;
    background-color: transparent;
    padding: 0.3rem 0.5rem;
    margin: 0;

    /* temporary until icons */
    /* font-weight: bold; */
  }
</style>
