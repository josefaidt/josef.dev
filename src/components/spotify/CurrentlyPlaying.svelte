<script>
  import { onMount } from 'svelte'
  import SpotifyIcon from '../icons/spotify.svg.svelte'

  let album
  let albumImageUrl
  let artist
  let songUrl
  let title
  let isPlaying = false

  async function getSpotifyCurrentlyPlaying() {
    const res = await fetch(`/api/spotify/currently-playing.json`)
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('Unable to fetch')
    }
  }

  async function getSpotifyRecentlyPlayed() {
    const res = await fetch(`/api/spotify/recently-played.json`)
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('Unable to fetch')
    }
  }

  onMount(async () => {
    const currentlyPlaying = await getSpotifyCurrentlyPlaying()
    if (currentlyPlaying?.isPlaying) {
      isPlaying = true
      album = currentlyPlaying.album
      albumImageUrl = currentlyPlaying.albumImageUrl
      artist = currentlyPlaying.artist
      songUrl = currentlyPlaying.songUrl
      title = currentlyPlaying.title
    }
  })
</script>

<section>
  <div>
    <SpotifyIcon />
    <p>
      {isPlaying ? `Now Playing` : 'Currently Offline'}
      {#if isPlaying}
        <span>&mdash;</span>
        <a href="{songUrl}" target="_blank">
          <span>{title} by {artist}</span>
        </a>
      {/if}
    </p>
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

    /* padding: 1rem 2rem; */
    border: 2px solid transparent;
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
    /* color: var(--colors-text); */
    /* filter: invert(0.4); */
  }
</style>
