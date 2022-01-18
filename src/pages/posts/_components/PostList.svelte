<script>
  import Article from './article.svelte'
  export let posts = []
</script>

<ul class="post-list">
  {#each posts as post, index (index)}
    <li>
      <a href="{post.slug}" aria-labelledby="{index}" sveltekit:prefetch>
        <Article
          {...post.metadata || {}}
          readingTime="{post.metadata?.readingTime?.text}"
        />
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
  ul.post-list {
    --gap: 1rem;
    display: grid;
    grid-gap: var(--gap);
  }

  @media (min-width: 33rem) {
    ul.post-list {
      --gap: 1.3rem;
    }
  }

  a,
  a:hover {
    text-decoration: none;
  }
</style>
