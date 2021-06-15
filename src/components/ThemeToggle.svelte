<script>
  import { getContext } from 'svelte'
  import LightModeIcon from '$icons/light.svg.svelte'
  import DarkModeIcon from '$icons/asleep.svg.svelte'

  const { toggle, current } = getContext('theme')
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
    color: var(--colors-text);
    border: 2px solid transparent;
    border-radius: 3px;
    background-color: transparent;
    padding: 0.3rem 0.4rem;
    margin: 0;

    display: flex;
    place-items: center;

    /* width: 40px;
    height: 40px; */

    fill: var(--colors-text);

    /* temporary until icons */
    /* font-weight: bold; */

    /* override site-wide background-color transition prop */
    transition-property: all;
  }

  button:hover,
  button:focus {
    border-color: var(--colors-accent);
    outline-color: var(--colors-link);
    background-color: transparent;
  }
</style>
