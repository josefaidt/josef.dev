<script>
  import CMDK from 'svelte-cmdk/src/cmd-k.svelte'
  import { goto } from '$app/navigation'
  import navigate from '$lib/navigate'

  const commands = [
    {
      category: 'Navigation',
      name: 'Go Home',
      hotkey: '1',
      hotkeyEnabler: event => event.shiftKey && event.key === '1',
      action: () => goto('/'),
      global: true,
    },
    {
      category: 'Navigation',
      name: 'Go Back',
      hotkey: 'Shift+Backspace',
      hotkeyEnabler: event => event.shiftKey && event.key === 'Backspace',
      action: () => window?.history.back(),
      global: true,
    },
    {
      category: 'Social',
      icon: '<svg></svg>',
      name: 'GitHub',
      action: () => navigate('https://github.com/josefaidt'),
    },
    {
      category: 'Social',
      icon: '<svg></svg>',
      name: 'Twitter',
      action: () => navigate('https://twitter.com/josefaidt'),
    },
  ]
</script>

<CMDK commands="{commands}" />
