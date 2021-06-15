<script>
  // export let as = 'button'
</script>

<button on:click>
  <slot />
</button>

<style>
  button {
    padding: 0.9rem;
    border-radius: 0.2rem;
    text-decoration: none;
    transition: all 100ms ease;
    color: var(--colors-bg);
    background-color: var(--colors-primary);
    border: 2px solid var(--colors-primary);
    cursor: pointer;
  }

  button:hover {
    background-color: var(--colors-accent);
    color: var(--ja-white);
    transition: all 200ms ease;
  }
</style>
