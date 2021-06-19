<script>
  import { page } from '$app/stores'

  let navItems = [
    {
      name: 'Uses',
      path: '/uses',
    },
    {
      name: 'Posts',
      path: '/posts',
    },
  ]
</script>

<nav>
  {#each navItems as item, index (index)}
    <a
      sveltekit:prefetch
      href="{item.path}"
      class:active="{$page.path === item.path}"
    >
      {item.name}
    </a>
  {/each}
</nav>

<style>
  nav {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content;
    column-gap: 0.5rem;
  }

  @media (min-width: 33rem) {
    nav {
      column-gap: 1rem;
    }
  }

  a {
    font-weight: bold;
    display: inline-block;
    padding: 0.3rem 0.5rem;
    height: min-content;
    text-decoration: none;
    transition: all 100ms ease;
    color: var(--colors-text);
    border: 2px solid transparent;
    border-radius: 0.2rem;
    filter: initial;
  }

  a.active {
    border-bottom: 2px solid var(--colors-primary);
  }

  a:hover {
    filter: initial;
    /* background-color: var(--colors-accent); */
    border: 2px solid var(--colors-accent);

    color: var(--colors-text);
    transition: all 100ms ease;
    text-decoration: none;
  }

  a.active:hover {
    border-bottom: 2px solid var(--colors-primary);
  }

  :global(html) {
    --nav-offset: 2.75rem;
  }

  @media (max-width: 33rem) {
    a:focus {
      outline: none;
    }
  }
</style>
