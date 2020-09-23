<script>
  import { getContext } from 'svelte'
  // import LightModeIcon from './icons/sun.svg'
  // import DarkModeIcon from './icons/moon.svg'
  // const { current, toggle } = getContext('theme')
  function _prefersColorScheme() {
    if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  function _initFromLocalStorage() {
    let stored = window.localStorage.getItem('__svelte-theme')
    if (stored && ['light', 'dark'].includes(stored)) return stored
    else return null
  }

  $: current = _initFromLocalStorage() || _prefersColorScheme()
  $: document.documentElement.className = `theme--${current}`
  $: window.localStorage.setItem('__svelte-theme', current)

  function toggle() {
    if (current === 'dark') current = 'light'
    else if (current === 'light') current = 'dark'
  }
</script>

<button on:click="{toggle}">
  {#if current === 'dark'}
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
