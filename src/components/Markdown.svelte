<script>
  //
</script>

<div data-markdown="{true}">
  <slot />
</div>

<style>
  div :global(a) {
    text-decoration: underline;
  }

  div :global(h2 a),
  div :global(h3 a),
  div :global(h4 a) {
    color: var(--theme-text);
    text-decoration: none;
  }

  div :global(h2 a:hover),
  div :global(h3 a:hover),
  div :global(h4 a:hover) {
    text-decoration: underline;
  }

  div :global(h3) {
    font-size: larger;
  }

  div :global(h4) {
    font-size: larger;
  }

  @media (min-width: 66rem) {
    div :global(p img) {
      width: unset;
      max-width: calc(100% + 4rem);
      margin-left: -2rem;
      margin-right: -2rem;
    }
  }

  :global(.icon.icon-link) {
    background-image: url(/link.svg);
  }
</style>
