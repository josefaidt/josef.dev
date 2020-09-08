<script>
  import GitHubIcon from './icons/github.svg'
  import SpotifyIcon from './icons/spotify.svg'
</script>

<footer>
  <p>
    &copy; {new Date().getFullYear()}, Build with
    <a href="https://svelte.dev">Svelte</a>
  </p>
  <div>
    <a
      href="https://open.spotify.com/user/1215285465?si=oxVZ8WelTQyZBdr97Tz4fQ"
      target="_blank"
      rel="noreferrer noorigin"
    >
      {@html SpotifyIcon}
    </a>
    <a href="https://github.com/josefaidt" target="_blank" rel="noreferrer noorigin">
      {@html GitHubIcon}
    </a>
  </div>
</footer>

<style>
  footer {
    grid-area: footer;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45rem;
  }

  @media (max-width: 33rem) {
    footer {
      width: 100%;
    }
  }

  footer p {
    margin: 0;
  }

  footer div {
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1.7rem;
  }

  footer div a {
    display: flex;
  }

  :global(footer svg) {
    width: 20px;
    fill: var(--theme-text);
  }

  :global(footer svg:hover) {
    fill: var(--theme-primary);
  }
</style>
