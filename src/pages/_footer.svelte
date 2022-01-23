<script>
  import GitHubIcon from '$icons/github.svg.svelte'
  import SpotifyIcon from '$icons/spotify.svg.svelte'
  import TwitterIcon from '$icons/twitter.svg.svelte'
  import LinkedInIcon from '$icons/linkedin.svg.svelte'
  import ExternalLinkIcon from '$icons/new-tab.svg.svelte'

  const projects = [
    {
      name: 'svelte-themer',
      url: 'https://svelte-themer.vercel.app/',
    },
    {
      name: 'Rouge Theme',
      url: 'https://marketplace.visualstudio.com/items?itemName=josef.rouge-theme',
    },
  ]
</script>

<div class="footer--container">
  <slot />
  <footer>
    <hr />
    <section data-footer-slot="content">
      <div>
        <h4>Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/posts" sveltekit:prefetch>Posts</a></li>
          <li><a href="/uses" sveltekit:prefetch>Uses</a></li>
          <li>
            <a href="https://resume.josef.dev">Resume<ExternalLinkIcon /></a>
          </li>
        </ul>
      </div>
      <div>
        <h4>Projects</h4>
        <ul>
          {#each projects as project}
            <li>
              <a href="{project.url}">{project.name}<ExternalLinkIcon /></a>
            </li>
          {/each}
        </ul>
      </div>
    </section>
    <section data-footer-slot="social" class="links-container">
      <p>
        &copy; {`${new Date().getFullYear()}`}, Built with
        <a href="https://kit.svelte.dev">Svelte-Kit</a>
      </p>
      <div class="socials">
        <a
          href="https://twitter.com/josefaidt"
          aria-label="Twitter"
          target="_blank"
          rel="me noreferrer noorigin"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://linkedin.com/in/josefaidt"
          aria-label="LinkedIn"
          target="_blank"
          rel="me noreferrer noorigin"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://open.spotify.com/user/1215285465?si=oxVZ8WelTQyZBdr97Tz4fQ"
          target="_blank"
          rel="me noreferrer noorigin"
          aria-label="Spotify"
        >
          <SpotifyIcon />
        </a>
        <a
          href="https://github.com/josefaidt"
          target="_blank"
          rel="me noreferrer noorigin"
          data-icon="github"
          aria-label="Github"
        >
          <GitHubIcon />
        </a>
        <!-- twitch -->
        <!-- twitter -->
        <!-- linkedin -->
      </div>
    </section>
  </footer>
</div>

<style>
  hr {
    border-color: rgb(0, 0, 0, 0);
    border-top: 1px solid var(--colors-shadow);
    border-radius: 0.2rem;
    --negative-spacing: -1rem;
    margin-left: var(--negative-spacing);
    margin-right: var(--negative-spacing);
    /* margin-bottom: 2rem; */
  }

  .footer--container {
    width: 80%;
    max-width: 800px;
    grid-area: footer;
    margin-left: auto;
    margin-right: auto;
  }

  footer {
    margin-top: var(--spacing, 0);
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: max-content;
    row-gap: 2rem;
  }

  .footer--container {
    padding: 0 0.5rem;
  }

  @media (min-width: 33rem) {
    .footer--container {
      padding: 0;
      margin-bottom: calc(var(--spacing, 0) / 2);
    }
  }

  @media (min-width: 66rem) {
    .footer--container {
      width: 80%;
    }
  }

  .links-container {
    /* padding-bottom: 2rem; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 90%;
  }

  footer p {
    margin: 0;
  }

  .links-container .socials {
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: 1.7rem;
  }

  .links-container .socials a {
    display: flex;
  }

  :global(footer svg) {
    width: 20px;
    height: 20px;
    fill: var(--colors-text);
  }

  :global(footer svg:hover) {
    fill: var(--colors-primary);
  }

  @media (max-width: 33rem) {
    .footer--container {
      width: 100%;
      max-width: 100vw;
      padding-bottom: calc(var(--nav-offset, 3rem) + 0.5rem);
    }
  }

  ul {
    list-style: none;
    padding-inline-start: 0;
    margin: 0;
  }

  ul li {
    display: flex;
  }

  ul li a {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  ul li a :global(svg) {
    width: 14px;
    height: 14px;
    margin-left: 0.2rem;
    fill: var(--colors-accent);
  }

  /* ul li a:hover :global(svg) {
    border-bottom: 1px solid var(--colors-accent);
  } */

  h4 {
    margin: 0;
    text-transform: uppercase;
  }

  section[data-footer-slot='content'] {
    display: grid;
    grid-auto-flow: column;
  }

  section[data-footer-slot='content'] > div {
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: max-content;
    row-gap: 0.2rem;
    /* grid-gap: 1rem; */
  }
</style>
