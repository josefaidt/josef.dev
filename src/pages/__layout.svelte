<script context="module">
  const STORAGE_KEY = '__josefdev_theme'
</script>

<script>
  import { ThemeWrapper } from 'svelte-themer'
  import { themes, base } from '$lib/theme'
  import ThemeToggle from '$components/ThemeToggle.svelte'
  import Logo from '$components/Logo.svelte'
  import SpotifyCurrentlyPlaying from '$components/spotify/CurrentlyPlaying.svelte'
  import Nav from './_nav.svelte'
  import Footer from './_footer.svelte'

  import '$styles/normalize.css'
  import '$styles/global.css'
  import '$styles/style.css'
  import '$styles/code.css'
  import '$styles/scrollbar.css'
</script>

<ThemeWrapper
  key="{STORAGE_KEY}"
  themes="{themes}"
  base="{base}"
  prefix="{null}"
>
  <!-- <CMDK /> -->
  <div class="container">
    <header>
      <Logo />
      <div>
        <Nav />
        <ThemeToggle />
      </div>
    </header>
    <main>
      <slot />
    </main>
    <Footer>
      <div class="spotify--container">
        <SpotifyCurrentlyPlaying />
      </div>
    </Footer>
  </div>
</ThemeWrapper>

<style>
  :global(html) {
    height: 100%;
  }

  :global(body) {
    min-height: 100%;
    display: flex;
  }

  :global(html, body) {
    color: var(--colors-text);
    background-color: var(--colors-bg);
  }

  :global(#svelte) {
    flex: 1 1 auto;
  }

  :global(*) {
    transition-property: background-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }

  :global(a) {
    color: var(--colors-link);
  }
  :global(a:focus) {
    outline-width: 2px;
    outline-color: var(--colors-link);
    outline-offset: 2px;
  }

  .container {
    margin: 0 auto;
    /* width: 100%;
    max-width: 100vw; */
    height: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: min-content 1fr min-content;
    grid-gap: 2rem;
    grid-template-areas:
      'header'
      'main'
      'footer';
  }

  @media (min-width: 33rem) {
    .container {
      max-width: 60rem;
      grid-gap: 4rem;
      padding: 0 2rem;
    }
  }

  header {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: header;
  }

  @media (min-width: 66rem) {
    header {
      margin: 0.5rem 0;
    }
  }

  header > div {
    display: grid;
    grid-auto-flow: column;
    column-gap: 1rem;
    align-items: center;
  }

  main {
    grid-area: main;
    width: calc(100vw - 16px);
    margin: 0 auto;
    min-height: 50vh;
    padding-bottom: 4rem;

    display: flex;
    flex-direction: column;
  }

  .spotify--container {
    /* justify-self: flex-end; */
    margin: 0.5rem 0;
  }

  @media (min-width: 33rem) {
    main {
      width: 80%;
      max-width: 800px;
    }
  }
</style>
