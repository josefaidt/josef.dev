<script>
  import { url, isActive } from '@roxi/routify'
  import Button from './Button.svelte'
  import ThemeToggle from './ThemeToggle.svelte'

  let navItems = [
    {
      name: 'Home',
      path: '/',
    },
    // {
    //   name: 'About',
    //   path: '/about',
    // },
    // {
    //   name: 'Uses',
    //   path: '/uses',
    // },
    {
      name: 'Blog',
      path: '/blog',
    },
  ]
</script>

<div>
  <nav>
    {#each navItems as item}<a href="{$url(item.path)}" class:active="{$isActive(item.path)}">{item.name}</a>{/each}
  </nav>
  <ThemeToggle />
</div>

<style>
  div,
  nav {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content;
    grid-gap: 1rem;
  }
  a {
    font-weight: bold;
    display: inline-block;
    padding: 0.3rem 0.5rem;
    /* border-radius: 0.2rem; */
    height: min-content;
    text-decoration: none;
    transition: all 100ms ease;
    color: var(--theme-text);
    border: 2px solid transparent;
    border-radius: 0.2rem;
    filter: initial;
  }
  a.active {
    /* filter: invert(0.5); */
    border-bottom: 2px solid var(--theme-primary);
  }

  a:hover {
    filter: initial;
    /* background-color: var(--theme-accent); */
    border: 2px solid var(--theme-accent);
    color: var(--theme-text);
    transition: all 100ms ease;
  }

  a.active:hover {
    /* filter: invert(0.5); */
    border-bottom: 2px solid var(--theme-primary);
  }

  :global(html) {
    --nav-offset: 2.75rem;
  }

  @media (max-width: 33rem) {
    nav {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      grid-template-columns: 1fr 1fr;
      text-align: center;

      height: var(--nav-offset);
      background-color: var(--theme-bg-contrast);
      /* box-shadow: 0px 0px 40px -10px var(--theme-shadow); */
    }

    a {
      border-bottom: 0 solid transparent;
      border-top: 2px solid var(--theme-bg-contrast);
    }

    a.active {
      border-bottom: 0 solid transparent;
      border-top: 2px solid var(--theme-primary);
    }

    a:focus {
      outline: none;
    }
  }
</style>
