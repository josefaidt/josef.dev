<script>
  import { onMount } from 'svelte'
  import SpotifyIcon from '../icons/spotify.svg.svelte'

  export let album
  export let albumImageUrl
  export let artist
  export let songUrl
  export let title
  export let isPlaying = false

  async function getSpotifyCurrentlyPlaying() {
    const res = await fetch(`/api/spotify/currently-playing`)
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('Unable to fetch')
    }
  }

  async function getSpotifyRecentlyPlayed() {
    const res = await fetch(`/api/spotify/recently-played`)
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('Unable to fetch')
    }
  }

  onMount(async () => {
    $$props = Object.assign(await getSpotifyCurrentlyPlaying(), $$props)
    if (!isPlaying) {
      $$props = Object.assign(await getSpotifyRecentlyPlayed(), $$props)
    }
  })
</script>

<section>
  <div>
    <SpotifyIcon />
    <p>{isPlaying ? `Now Playing` : 'Currently Offline'}</p>
  </div>
</section>

<style>
  section :global(svg),
  section :global(svg:hover) {
    fill: limegreen;
  }

  section {
    display: grid;
    grid-auto-flow: row;
    grid-auto-columns: max-content;
    grid-auto-rows: max-content;
    column-gap: 1rem;
    row-gap: 0.5rem;
    place-items: center;

    padding: 1rem 2rem;
    border: 2px solid green;
    border-radius: 3px;
  }

  section > div {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    column-gap: 1rem;
    place-items: center;
  }

  p {
    margin: 0;
  }

  p span {
    color: var(--colors-text);
    /* filter: invert(0.4); */
  }
</style>
