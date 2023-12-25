---
title: Migrating Content from Markdown to GitHub
description: How I migrated content from plain Markdown files to GitHub issues, and lessons learned
tags: ["content"]
pubDate: 2022-01-21
isArchived: true
---

You might have seen [swyx's Twitter thread on moving his site to GitHub as the default CMS](https://twitter.com/swyx/status/1480356418817753088?s=20), and well, it was the motivation I needed to also make the move.

In the previous iteration of this site I was using Markdown files, local images, and a hand-rolled GraphQL layer to add static content. While the GraphQL layer was a lot of fun to write and implement, writing became tedious when I wanted to quickly nab a screenshot. Wanting to mitigate this impedance I explored a handful of different solutions:

- VSCode extension to paste images into Markdown files
- [Notion](https://notion.so/)
- [Forestry](https://forestry.io/)
- migrate _back_ to [MDsveX](https://mdsvex.com/)
- WordPress (ugh PHP)
- GitHub issues

While many of these choices cater to my immediate needs, the maintenance shifts and can even increase overhead. Given the GraphQL layer already used Markdown as a content source what solution would have the least amount of friction to adopt? In the end I settled on GitHub. It's a platform I spend a ton of time on and am no stranger to writing or responding to GitHub issues, plus the extensibility possibilities of adding comments and reactions or managing content types via labels seemed very enticing.

## What the move required

My existing architecture consisted of a package for parsing and transforming Markdown to HTML, a GraphQL Layer that read markdown files from a directory, and a preprocessor for the GraphQL Layer. Meaning I could export a query constant from a Svelte file, run it against the GraphQL API at build time, and replace the query string with the data returned from GraphQL. This looked something like the following to get the list of published posts:

```html
<script context="module">
  export const query = [
    `
    query ALL_POSTS(
      $toLocaleDateStringOptions: LocaleDateStringOptions,
      $published: Boolean
    ) {
      allPosts(options:
        { toLocaleDateStringOptions: $toLocaleDateStringOptions, published: $published }
      ) {
        slug
        metadata {
          title
          date
          description
          tags
          readingTime {
            text
          }
        }
      }
    }
  `,
    {
      toLocaleDateStringOptions: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      published: true,
    },
  ]
</script>
```

Although this was a lot of fun to build, we're left with a few caveats:

- no dynamic variables (in the example above we're not able to pass `import.meta.PROD` to the query because the preprocessor runs before that value is available)
- no hot-reload -- if we were to start writing a post any time we make an edit we're forced to restart the dev server to see the updates. This could probably be mitigated, however we're left with the final caveat
- it's just Markdown, meaning we are unable to paste images. While markdown is incredibly powerful and the perfect choice for writing content, sometimes I want to paste a quick screenshot

Given we already had a dedicated package to parse markdown, the move really just needed to change where the markdown was coming from and map the new data points; instead of reading from the filesystem we'll be fetching from an API. By doing so, removing the need for the GraphQL Layer for content. Despite this I'm still keeping it around for global app metadata 😉

To answer the question "what the move required" succinctly, remove the GraphQL layer code from the frontend, set up endpoints to fetch data from GitHub, migrate the markdown package to parse frontmatter in a new way (YAML fenced code blocks vs typical frontmatter (`---`)), and set content types via GitHub labels. In the end we are left with a slick authoring experience that allows all the features we currently have plus the ability to paste images.

## What I learned

Between building the monorepo with a GraphQL API, preprocessor, Vite plugin, and package dedicated to markdown parsing, moving to GitHub issues took very little time. As stated above the bulk of the work was changing the content source and ensuring content was transformed in a familiar fashion.

While changing the data source was its own challenge I also learned:

- how to parse frontmatter content out of a YAML fenced code block
- how to fetch content from GitHub and leverage labels as an additional source of metadata
- deeper knowledge of SvelteKit endpoints and dynamic routes

## Next Steps

As for the next steps we have still yet to leverage comments and reactions, but I'm not too sure I want to introduce comments to my site just yet. While I do get some traffic I do not find comments on posts in personal sites to add much value. In the immediate time frame managing post tags with GitHub labels seems like a viable choice as it adds the ability to filter post content based on tags in GitHub issues search. However this can also introduce skewed page view results as discussed in the next section: the caveats.

### Known Caveats

First and foremost, site analytics. With content written as markdown and committed to the repo there's nothing stopping folks from visiting the repo and viewing the raw markdown, however with GitHub issues this lowers that barrier where we can easily read the rendered markdown. Although this is a slight concern I think in the end it is negligible, and if we _really_ wanted to chase a mitigation we could simply move the content to another repo and change the GitHub query to use the separate, private repo to read from.

We also have a lack of ability to process images. Previously I was using a plugin to upload local images to Cloudinary, which opens a few doors, though I wasn't doing any image processing in the first place so this isn't a massive concern for my use case.

Finally, dates. This was originally controlled by manually inputting and maintaining a `date` property in the post/page frontmatter, however now we can also lean on GitHub's published and last updated date. While migrating content this was still needed to retain the original publish date however in the future we can leverage the `date` property and fallback on issue creation or last updated date. Not the most pressing caveat but an interesting side effect.

---

## Conclusion

This was yet again a lot of fun to implement and I feel will lower the barrier for content authoring by using a familiar platform, and hopefully improve authoring velocity. If you like writing Markdown and just wish you could paste images much like you could with many other editors then I suggest making the move to use GitHub as a CMS.
