<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    return {
      props: {
        isPlaying: false,
      },
    }
  }
</script>

<script>
  import { onMount } from 'svelte'
  export let isPlaying
  export let currentlyPlaying = {}

  $: isPlaying = currentlyPlaying.isPlaying
  $: album = currentlyPlaying.album
  $: albumImageUrl = currentlyPlaying.albumImageUrl
  $: artist = currentlyPlaying.artist
  $: songUrl = currentlyPlaying.songUrl
  $: title = currentlyPlaying.title

  async function getSpotifyCurrentlyPlaying() {
    const res = await fetch(`/api/spotify/currently-playing`)
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('Unable to fetch')
    }
  }

  onMount(async () => {
    currentlyPlaying = await getSpotifyCurrentlyPlaying()
  })

  $: console.log(title)
</script>

<h1>Dashboard</h1>
<!-- {#await getSpotifyCurrentlyPlaying()}
  <p>loading..</p>
{:then current}
  <pre><code>{JSON.stringify(current, null, 2)}</code></pre>
{:catch error}
  <pre>error</pre>
  <pre><code>{error}</code></pre>
{/await} -->
<div class="spotify">
  <p>{isPlaying ? `Now playing ${title}` : 'Not playing'}</p>
</div>

<style>
  .spotify {
    padding: 1rem 2rem;
    border: 1px solid green;
  }
</style>
