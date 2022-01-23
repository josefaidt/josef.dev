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
    <div class="currently-playing--container">
      <span class:isPlaying
        >{isPlaying ? `Now Playing` : 'Currently Offline'}</span
      >
      {#if isPlaying}
        <p>
          <a href="{songUrl}" target="_blank">
            <span>{title} by {artist}</span>
          </a>
        </p>
      {/if}
    </div>
  </div>
</section>

<style>
  section :global(svg),
  section :global(svg:hover) {
    width: 24px;
    height: 24px;
    fill: limegreen;
  }

  section {
    display: grid;
    grid-auto-flow: row;
    /* grid-auto-columns: max-content; */
    justify-content: start;
    grid-auto-rows: max-content;
    column-gap: 1rem;
    row-gap: 0.5rem;
    place-items: center;

    font-size: 90%;

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
    line-height: 1.2rem;
  }

  div > span {
    margin-top: -0.5rem;
  }

  span.isPlaying {
    font-size: smaller;
    position: absolute;
    top: -0.8rem;
  }

  @media (min-width: 33rem) {
    span.isPlaying {
      position: relative;
      top: initial;
    }
  }

  .currently-playing--container {
    line-height: 1.2rem;
    position: relative;
  }

  p span {
    /* color: var(--colors-text); */
    /* filter: invert(0.4); */
  }
</style>
