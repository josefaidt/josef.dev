<script>
  import info from '../app.config'
  import { url } from '@roxi/routify'
</script>

<div>
  <a href="{$url('/')}">
    <h1>josef</h1>
  </a>
</div>

<style>
  a {
    color: inherit;
    text-decoration: none;
  }

  a:focus {
    outline-offset: 7px;
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--theme-text);
    text-shadow: 0.1rem 0.1rem var(--theme-primary);
    transition: all 300ms;
  }

  h1:hover {
    transition: all 300ms;
    text-shadow: 0.05rem 0.05rem var(--theme-primary);
  }
</style>
