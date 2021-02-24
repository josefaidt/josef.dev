<script context="module">
  const STORAGE_KEY = '__josefdev_theme'
</script>

<script>
  import { onMount } from 'svelte'
  import LightModeIcon from '$icons/light.svg.svelte'
  import DarkModeIcon from '$icons/asleep.svg.svelte'
  import { browser as isBrowser } from '$app/env'
  function _prefersColorScheme() {
    if (isBrowser && window.matchMedia('(prefers-color-scheme:dark)').matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  function _initFromLocalStorage() {
    let stored = isBrowser && window.localStorage.getItem(STORAGE_KEY)
    if (stored && ['light', 'dark'].includes(stored)) return stored
    else return null
  }

  let current = null
  onMount(() => {
    current = _initFromLocalStorage() || _prefersColorScheme()
  })

  $: current = _initFromLocalStorage() || _prefersColorScheme()
  $: isBrowser && document.documentElement.setAttribute('theme', current)
  $: isBrowser && window.localStorage.setItem(STORAGE_KEY, current)

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
</style>
