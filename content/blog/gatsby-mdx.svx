---
title: 'Gatsby & MDX'
description: 'My thoughts on using MDX in general, and how I use MDX with Gatsby'
date: 2019-02-18
tags: ['javascript', 'mdx', 'gatsby', 'websites']
published: true
---

This.tech.is.too.cool.

Using Gatsby to write blog posts in [Markdown](https://en.wikipedia.org/wiki/Markdown) is great, for the most part I don't feel the need to reach for anything more. Well, but it would be nice to write all of my pages in Markdown if only I could also use my JavaScript (React) components.

That was when I stumbled upon [MDX](https://github.com/mdx-js/mdx).

MDX is a blend of Markdown and JSX, the language prominently known for its use in React. I came across MDX on the [Gatsby livestream](https://www.youtube.com/watch?v=PS2784YfPpw) the other week and saw how they were using it to build their pages (with [gatbsy-mdx](https://gatsby-plugin-mdx.netlify.com/)). I thought that'd be great to use considering how tedious HTML can be to type even with the help of [Emmet](https://emmet.io/) and a few trusty VSCode extensions. Maybe not just typing, but reading, too.

So I picked up and tried it out, and it is phenomenal to work with. The setup is much like setting up Markdown in Gatsby, and can use the same `gatsby-remark-*` plugins. Though I haven't quite fully implemented it here on my site, I can't wait to convert and further modularize pages like my Résumé.

If you're looking for a more customized version of Markdown, but don't want to overcomplicate things, try MDX.
