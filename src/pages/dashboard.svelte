<script context="module">
  import { browser as isBrowser } from '$app/env'
  // /**
  //  * @type {import('@sveltejs/kit').Load}
  //  */
  export async function load({ page, fetch, session, context }) {
    const url = `${isBrowser ? '' : 'http://localhost:3000'}/api/spotify/currently-playing`
    const res = await fetch(url)

    if (res.ok) {
      return {
        props: {
          currentlyPlaying: await res.json(),
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
  export let currentlyPlaying
  // async function getSpotifyCurrentlyPlaying() {
  //   if (isBrowser) {
  //     const res = await fetch(`/api/spotify/currently-playing`)
  //     if (res.ok) {
  //       return await res.json()
  //     } else {
  //       throw new Error('Unable to fetch')
  //     }
  //   }
  // }
</script>

<h1>Dashboard</h1>
<!-- {#await getSpotifyCurrentlyPlaying()}
  <p>loading..</p>
{:then currentlyPlaying} -->
<pre><code>{JSON.stringify(currentlyPlaying, null, 2)}</code></pre>
<!-- {:catch error}
  <p>error</p>
  <pre><code>{error}</code></pre>
{/await} -->
