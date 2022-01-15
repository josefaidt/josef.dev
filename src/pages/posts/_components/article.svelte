<script>
  import Tags from './tags.svelte'

  export let id = 0
  export let date
  export let title
  export let readingTime
  export let tags
  export let views = 0
</script>

<article>
  <div>
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
  </div>
  {#if views > 0}
    <div>
      <span class="page-views">{views} {views === 1 ? 'view' : 'views'}</span>
    </div>
  {/if}
</article>

<style>
  a,
  article {
    color: var(--colors-text);
    text-decoration: none;
  }

  article {
    display: flex;
    justify-content: space-between;
    align-items: center;

    --border-color: transparent;
    --article-offset: 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    margin: 0 calc(var(--article-offset) * -1 / 2);
    padding: calc(var(--article-offset) / 1.5) var(--article-offset);

    transition: all 50ms ease;
  }

  article > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
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

  article .page-views {
    font-size: normal;
    font-weight: bold;
  }

  article .reading-time, article .page-views {
    display: none;
    font-style: italic;
  }
  @media (min-width: 33rem) {
    article .reading-time, article .page-views {
      display: inline;
    }
  }

  article:hover {
    /* --hover: var(--colors-primary); */
    --hover: var(--rouge);
    background-color: var(--hover);
    color: var(--colors-bg);
    transition: all 100ms ease;
  }

  :global(html[theme='dark']) article:hover {
    /* --post-tag-hover: var(--rouge-dark); */
    --post-tag-hover: #d7a1a5;
  }
</style>
