<script>
  import { Router } from '@roxi/routify/runtime'
  import { routes } from '../.routify/routes'
</script>

<!-- <ThemeProvider> -->
<Router routes="{routes}" />

<!-- </ThemeProvider> -->
<style>
  :global(#app) {
    height: inherit;
  }
</style>
