<script>
  export let href
  export let rel = 'me noopener noreferrer'

  const isOutboundLink = /^(?:http|https)/.test(href)
</script>

<a
  href="{href}"
  rel="{rel}"
  target="{isOutboundLink ? '_blank' : '_self'}"
  {...$$props}
>
  <slot />
</a>
