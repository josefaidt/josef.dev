<script context="module">
  export const KEYCODE_ENTER = 13
  export const KEYCODE_UP = 38
  export const KEYCODE_DOWN = 40
  export const KEYCODE_ESCAPE = 27
</script>

<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import navigate from '$lib/navigate'

  let needed = ['Meta', 'k']
  let keyPair = new Map()
  $: enabled = false
  let input = ''

  const Categories = [
    {
      category: 'Navigation',
      icon: '<svg></svg>',
      commands: [
        {
          shortcut: ['h', 72],
          name: 'Go Home',
          action: () => goto('/'),
        },
        {
          shortcut: ['Backspace', 8],
          name: 'Go Back',
          action: () => window?.history.back(),
        },
      ],
    },
    {
      category: 'Social',
      commands: [
        {
          icon: '<svg></svg>',
          name: 'GitHub',
          action: () => navigate('https://github.com/josefaidt'),
        },
        {
          icon: '<svg></svg>',
          name: 'Twitter',
          action: () => navigate('https://twitter.com/josefaidt'),
        },
      ],
    },
  ]

  const Commands = [
    {
      category: 'Navigation',
      shortcut: ['h', 72],
      name: 'Go Home',
      action: () => goto('/'),
    },
    {
      category: 'Navigation',
      shortcut: ['Backspace', 8],
      name: 'Go Back',
      action: () => window?.history.back(),
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

  // fuzzy match entries as typed
  $: filterBy = new RegExp(
    input
      .split('')
      .map(str => `${str}.*`)
      .join(''),
    'gi'
  )
  $: filteredCommands = Commands.filter(cmd => filterBy.test(cmd.name))
  $: highlighted = 0

  function handleKeydown({ key, keyCode }) {
    switch (keyCode) {
      case KEYCODE_ENTER: {
        document.querySelector('[data-selected=true]')?.click()
        enabled = false
        break
      }
      case KEYCODE_UP: {
        if (highlighted === 0) return
        else highlighted -= 1
        break
      }
      case KEYCODE_DOWN: {
        if (highlighted === filteredCommands.length - 1) return
        else highlighted += 1
        break
      }
      case KEYCODE_ESCAPE: {
        keyPair.clear()
        enabled = false
        break
      }
      default: {
        if (highlighted !== 0) highlighted = 0
        keyPair.set(key, keyCode)
        if (keyPair.has(needed[0]) && keyPair.has(needed[1])) {
          enabled = true
        }
        break
      }
    }
  }

  function handleKeyUp({ key, keyCode }) {
    keyPair.delete(key, keyCode)
  }

  function focus(element) {
    element.focus()
  }

  function handleClickOutsideToClose(event) {
    if (!event.target.closest('.cmdk-container')) {
      enabled = false
    }
  }
</script>

<svelte:window
  on:keydown="{handleKeydown}"
  on:keyup="{handleKeyUp}"
  on:click="{handleClickOutsideToClose}"
/>

{#if enabled}
  <div class="overlay">
    <div class="cmdk-container">
      <div class="cmdk" role="dialog" aria-modal="true">
        <div
          role="combobox"
          aria-owns="cmdk-list"
          aria-haspopup="listbox"
          aria-expanded="true"
        >
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Type a Command..."
            maxlength="32"
            spellcheck="false"
            aria-autocomplete="list"
            autocomplete="off"
            bind:value="{input}"
            use:focus
          />
        </div>
        <div class="list-wrapper">
          <ul role="listbox" id="cmdk-list">
            <!-- {#each Categories as commandSet, index}
              <li role="presentation">
                <div>{commandSet.category}</div>
                <ul role="group">
                  {#each commandSet.commands as command, k}
                    <li
                      role="option"
                      on:click="{command.action}"
                      class:highlighted="{highlighted === `${index}-${k}`}"
                      data-selected="{highlighted === `${index}-${k}`}"
                    >
                      {command.name}
                    </li>
                  {/each}
                </ul>
              </li>
              {/each} -->
            {#each filteredCommands as command, index}
              <li role="presentation">
                <div>{command.category}</div>
                <ul role="group">
                  <li
                    role="option"
                    on:click="{command.action}"
                    class:highlighted="{highlighted === index}"
                    data-selected="{highlighted === index}"
                  >
                    {command.name}
                  </li>
                </ul>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cmdk-container {
    --padding: 1rem;
    max-width: 100%;
    padding: var(--padding);
    width: 400px;
    background-color: white;
    border-radius: calc(var(--padding) / 2);
  }

  .cmdk {
    background: var(--background);
  }

  input {
    width: 100%;
  }

  label {
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .list-wrapper {
    overflow-y: auto;
    transition: height 0.1s ease 0s;
    will-change: height;
    position: relative;
    height: 300px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 0;
  }

  li[role='option'] {
    cursor: pointer;
    padding-left: 0.2rem;
    padding-right: -0.2rem;
  }

  li[role='option']:hover {
    padding: -2rem 0;
    background-color: aquamarine;
  }

  .highlighted {
    background-color: lightgrey;
  }

  li[role='presentation'] {
    /* font-size: 60%; */
  }

  li[role='presentation'] > div {
    font-size: 70%;
  }
</style>
