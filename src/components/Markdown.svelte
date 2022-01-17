<script>
  //
</script>

<div data-markdown="{true}">
  <slot />
</div>

<style>
  [data-markdown] :global(a) {
    text-decoration: underline;
    font-weight: bold;
  }

  [data-markdown] :global(h2 a),
  [data-markdown] :global(h3 a),
  [data-markdown] :global(h4 a) {
    color: var(--colors-text);
    text-decoration: none;
  }

  [data-markdown] :global(h2 a:hover),
  [data-markdown] :global(h3 a:hover),
  [data-markdown] :global(h4 a:hover) {
    text-decoration: underline;
  }

  [data-markdown] :global(h3) {
    font-size: larger;
  }

  [data-markdown] :global(h4) {
    font-size: larger;
  }

  @media (min-width: 66rem) {
    [data-markdown] :global(p img) {
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
