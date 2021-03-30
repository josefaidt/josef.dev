<script>
  import { onMount } from 'svelte'

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

  onMount(async () => {
    console.log('MOUNTING')
    $$props = Object.assign(await getSpotifyCurrentlyPlaying(), $$props)
  })
</script>

<div>
  <p>{isPlaying ? `Now playing ${title}` : 'Not playing'}</p>
</div>

<style>
  div {
    padding: 1rem 2rem;
    border: 1px solid green;
  }
</style>
