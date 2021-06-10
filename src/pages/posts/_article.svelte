<script>
  import Tags from './_tags.svelte'

  export let id = 0
  export let date
  export let title
  export let readingTime
  export let tags
</script>

<article>
  <div class="post-meta">
    <span>
      {date}
    </span>
    <span class="reading-time">{readingTime}</span>
  </div>
  <h3 id="{id}"><slot>{title}</slot></h3>
  {#if tags?.length > 0}
    <Tags tags="{tags}" />
  {/if}
</article>

<style>
  a,
  article {
    color: var(--theme-text);
    text-decoration: none;
  }

  article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    --border-color: transparent;
    --article-offset: 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    margin: 0 calc(var(--article-offset) * -1 / 2);
    padding: calc(var(--article-offset) / 1.5) var(--article-offset);

    transition: all 50ms ease;
  }

  @media (min-width: 33rem) {
    article {
      margin: 0 calc(var(--article-offset) * -1);
    }
  }

  h3 {
    margin: 0;

    font-size: x-large;
    line-height: 1.8rem;
    /* padding-top for font offset with josefin sans */
    padding-top: 0.2rem;
  }

  @media (min-width: 33rem) {
    h3 {
      font-size: large;
      line-height: 2.1rem;
    }
  }

  article div.post-meta {
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.8rem;
  }

  article span {
    font-size: smaller;
    line-height: normal;
  }

  article .reading-time {
    display: none;
    font-style: italic;
  }
  @media (min-width: 33rem) {
    article .reading-time {
      display: inline;
    }
  }

  article:hover {
    /* --hover: var(--theme-primary); */
    --hover: var(--rouge);
    background-color: var(--hover);
    color: var(--theme-bg);
    transition: all 100ms ease;
  }

  :global(html[theme='dark']) article:hover {
    /* --post-tag-hover: var(--rouge-dark); */
    --post-tag-hover: #d7a1a5;
  }
</style>
