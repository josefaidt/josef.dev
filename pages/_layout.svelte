<script>
  // PRIMARY LAYOUT
  import Nav from '../components/Nav.svelte'
  import info from '../app.config'
</script>

<div class="container">
  <header>
    <h1>{info.name}</h1>
    <Nav />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <p>
      Build with
      <a href="https://svelte.dev">Svelte</a>
    </p>
  </footer>
</div>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: header;
  }

  main {
    /* background-color: tomato; */
    /* color: black; */
    grid-area: main;
  }

  footer {
    grid-area: footer;
    margin: 0 auto;
  }

  .container {
    margin: 0 auto;
    height: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: min-content 1fr min-content;
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
