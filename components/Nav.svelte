<script>
  import { url, isActive } from '@sveltech/routify'
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

  nav a.active {
    color: black;
  }
</style>
