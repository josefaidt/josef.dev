<script>
  // PRIMARY LAYOUT
  import Nav from '../components/Nav.svelte'
  import Logo from '../components/Logo.svelte'
  import Footer from '../components/Footer.svelte'
</script>

<div class="container">
  <header>
    <Logo />
    <div>
      <Nav />
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
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: header;
  }

  @media (max-width: 33rem) {
    header {
      margin: 0.5rem 0;
    }
  }

  header > * + div {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2rem;
    align-items: center;
  }

  main {
    /* background-color: tomato; */
    /* color: black; */
    grid-area: main;
    width: 80%;
    max-width: inherit;
    margin: 0 auto;
  }

  @media (max-width: 33rem) {
    main {
      width: 95vw;
    }
  }

  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 100vw;
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

  @media (min-width: 33rem) {
    .container {
      max-width: 60rem;
    }
  }
</style>
