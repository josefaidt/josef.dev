<script context="module">
  export const prerender = true
  // export const hydrate = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const { slug } = page.params
    const post = await (await fetch(`/posts/${slug}.json`)).json()
    return {
      props: { post },
    }
  }
</script>

<script>
  import SEO from '$components/SEO.svelte'
  import getShareImage from '@jlengstorf/get-share-image'
  import { getContext } from 'svelte'

  export let post

  const { theme } = getContext('theme')

  const socialImage = getShareImage({
    title: post.metadata.title,
    tagline: post.metadata.tags.map(k => `#${k}`).join('  '),
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    imagePublicID: import.meta.env.VITE_CLOUDINARY_IMAGE_PUBLIC_ID,
    textColor: $theme.text.slice(1),
  })
</script>

<SEO {...post.metadata} imageUrl="{socialImage}" />
<h1>{post.metadata.title}</h1>
<span>{post.metadata.date}</span>
<!-- <svelte:component this="{component}" /> -->
{@html post.html}

<style>
  h1 {
    --font-size: 2rem;
    margin-top: 0.75rem;
    margin-bottom: 0;
    line-height: calc(var(--font-size) + 0.2rem);
    font-size: var(--font-size);
  }
</style>
