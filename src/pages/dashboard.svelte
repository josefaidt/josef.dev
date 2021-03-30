<script context="module">
  import { browser as isBrowser } from '$app/env'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    if (!isBrowser) {
      return {
        props: {
          isPlaying: false,
        },
      }
    }

    const url = `/api/spotify/currently-playing`
    const res = await fetch(url)

    if (res.ok) {
      return {
        props: {
          ...(await res.json()),
        },
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    }
  }
</script>

<script>
  import { onMount } from 'svelte'

  export let album
  export let albumImageUrl
  export let artist
  export let songUrl
  export let title
  export let isPlaying

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
