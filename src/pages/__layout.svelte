<script context="module">
  const STORAGE_KEY = '__josefdev_theme'

  // when prerendering posts and posts/[slug], this code will not work
  // export async function load({ fetch }) {
  //   let response
  //   try {
  //     response = await fetch('/api/spotify/currently-playing.json')
  //   } catch (error) {
  //     console.error('there was an issue fetching')
  //   }
  //   return { props: { currentlyPlaying: await response.json() } }
  // }
</script>

<script>
  import { ThemeWrapper } from 'svelte-themer'
  import { themes, base } from '$lib/theme'
  // PRIMARY LAYOUT
  // import CMDK from '$components/cmd-k.svelte'
  import ThemeToggle from '$components/ThemeToggle.svelte'
  import Logo from '$components/Logo.svelte'
  import SpotifyCurrentlyPlaying from '$components/spotify/CurrentlyPlaying.svelte'
  import Nav from './_nav.svelte'
  import Footer from './_footer.svelte'

  import '$styles/normalize.css'
  import '$styles/global.css'
  import '$styles/style.css'
  import '$styles/prism.css'
  import '$styles/scrollbar.css'
</script>

<ThemeWrapper
  key="{STORAGE_KEY}"
  themes="{themes}"
  base="{base}"
  prefix="{null}"
  theme="light"
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
    <Footer --spacing="4rem">
      <SpotifyCurrentlyPlaying />
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
    /* background-color: tomato; */
    /* color: black; */
    grid-area: main;
    /* min-width: 80%; */
    width: calc(100vw - 16px);
    margin: 0 auto;

    /* --main-grid-flow: row;
    --main-grid-row-gap: 0rem;
    --main-grid-column-gap: 0rem;
    display: grid;
    grid-auto-flow: var(--main-grid-flow);
    row-gap: var(--main-grid-row-gap);
    column-gap: var(--main-grid-column-gap); */
  }

  @media (min-width: 33rem) {
    main {
      width: 80%;
      max-width: 800px;
    }
  }
</style>
