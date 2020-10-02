<script>
  import GitHubIcon from './icons/github.svg.svelte'
  import SpotifyIcon from './icons/spotify.svg.svelte'
  import TwitterIcon from './icons/twitter.svg.svelte'
  import LinkedInIcon from './icons/linkedin.svg.svelte'
</script>

<footer>
  <p>&copy; {new Date().getFullYear()}, Build with <a href="https://svelte.dev">Svelte</a></p>
  <div>
    <a href="https://twitter.com/josefaidt" aria-label="Twitter" target="_blank" rel="noreferrer noorigin">
      <TwitterIcon />
    </a>
    <a href="https://linkedin.com/in/josefaidt" aria-label="LinkedIn" target="_blank" rel="noreferrer noorigin">
      <LinkedInIcon />
    </a>
    <a
      href="https://open.spotify.com/user/1215285465?si=oxVZ8WelTQyZBdr97Tz4fQ"
      target="_blank"
      rel="noreferrer noorigin"
      aria-label="Spotify"
    >
      <SpotifyIcon />
    </a>
    <a
      href="https://github.com/josefaidt"
      target="_blank"
      rel="noreferrer noorigin"
      data-icon="github"
      aria-label="Github"
    >
      <GitHubIcon />
    </a>
    <!-- twitch -->
    <!-- twitter -->
    <!-- linkedin -->
  </div>
</footer>

<style>
  footer {
    grid-area: footer;
    padding-bottom: 2rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    font-size: 90%;
  }

  footer p {
    margin: 0;
  }

  footer div {
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: 1.7rem;
  }

  footer div a {
    display: flex;
  }

  :global(footer svg) {
    width: 20px;
    height: 20px;
    fill: var(--theme-text);
  }

  :global(footer svg:hover) {
    fill: var(--theme-primary);
  }

  @media (max-width: 33rem) {
    footer {
      width: 100%;
      padding-bottom: calc(var(--nav-offset, 3rem) + 0.5rem);
    }
  }
</style>
