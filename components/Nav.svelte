<script>
  import { url, isActive } from '@roxi/routify'
  import Button from './Button'
  import ThemeToggle from './ThemeToggle'

  let navItems = [
    // {
    //   name: 'About',
    //   path: '/about',
    // },
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

<div>
  <nav>
    {#each navItems as item}
      <a href="{$url(item.path)}" class:active="{$isActive(item.path)}">{item.name}</a>
    {/each}
  </nav>
  <ThemeToggle />
</div>

<style>
  div,
  div > nav {
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
    /* transition: all 100ms ease; */
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
    /* transition: all 200ms ease; */
  }

  a.active:hover {
    /* filter: invert(0.5); */
    border-bottom: 2px solid var(--theme-primary);
  }
</style>
