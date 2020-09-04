<script>
  // PRIMARY LAYOUT
  import Nav from '../components/Nav'
  import Logo from '../components/Logo'
  import Button from '../components/Button'
  import Footer from '../components/Footer'

  import { getContext } from 'svelte'
  const { toggle, current } = getContext('theme')
</script>

<div class="container">
  <header>
    <Logo />
    <div>
      <Nav />
      <Button on:click="{toggle}">{$current}</Button>
    </div>
  </header>
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
  :global(a) {
    color: var(--theme-accent);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: header;
  }

  header > * + div {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2rem;
  }

  main {
    /* background-color: tomato; */
    /* color: black; */
    grid-area: main;
    width: 45rem;
    margin: 0 auto;
  }

  @media (max-width: 33rem) {
    main {
      width: 100%;
    }
  }

  .container {
    margin: 0 auto;
    height: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: min-content 1fr min-content;
    grid-gap: 4rem;
    grid-template-areas:
      'header'
      'main'
      'footer';
  }

  @media (min-width: 66rem) {
    .container {
      max-width: 60rem;
    }
  }
</style>
