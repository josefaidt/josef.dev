<script>
  import Tag from './_tag.svelte'
  export let tags
</script>

<ul>
  {#each tags as tag, index (index)}
    <li><Tag>#{tag}</Tag></li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;

    display: none;
    grid-auto-flow: column;
    column-gap: 0.5rem;
  }

  @media (min-width: 33rem) {
    ul {
      display: grid;
    }
  }

  li {
    line-height: normal;
  }
</style>
