<script>
  import { url, isActive } from '@roxi/routify'
  import Button from './Button'

  let navItems = [
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Blog',
      path: '/blog',
    },
  ]
</script>

<nav>
  {#each navItems as item}
    <a href="{$url(item.path)}" class:active="{$isActive(item.path)}">{item.name}</a>
  {/each}
</nav>

<style>
  nav {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content;
    grid-gap: 1rem;
  }

  a {
    font-weight: bold;
    display: inline-block;
    padding: 0.6rem 0.9rem;
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
