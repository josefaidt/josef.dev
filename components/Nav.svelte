<script>
  import { url, isActive } from '@roxi/routify'
  import Button from './Button'

  let navItems = [
    {
      name: 'Home',
      path: '/',
    },
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
    display: inline-block;
    padding: 0.9rem;
    border-radius: 0.2rem;
    height: min-content;
    text-decoration: none;
    transition: all 100ms ease;
    color: var(--theme-text);
    border: 1px solid transparent;
    filter: initial;
  }
  a.active {
    filter: invert(0.5);
  }

  a:hover,
  a.active:hover {
    filter: initial;
    background-color: var(--theme-accent);
    color: var(--ja-white);
    transition: all 200ms ease;
  }
</style>
