<script>
  import { onMount } from 'svelte'
  import LightModeIcon from '$icons/light.svg.svelte'
  import DarkModeIcon from '$icons/asleep.svg.svelte'
  // const { current, toggle } = getContext('theme')
  function _prefersColorScheme() {
    if (window?.matchMedia('(prefers-color-scheme:dark)')?.matches) {
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

  let current = null
  onMount(() => {
    current = _initFromLocalStorage() || _prefersColorScheme()
  })

  $: current = _initFromLocalStorage() || _prefersColorScheme()
  $: document.documentElement.setAttribute('theme', current)
  $: window.localStorage.setItem('__svelte-theme', current)

  function toggle() {
    if (current === 'dark') current = 'light'
    else if (current === 'light') current = 'dark'
  }
</script>

<button on:click="{toggle}">
  {#if current === 'dark'}
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

  /* nav grid offset */
  button {
    margin-left: 0.5rem;
  }
</style>
