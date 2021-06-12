<script>
  // export let left = 0
  // export let top = 0
  export let left
  export let top
  export let bottom = 0
  export let right = 0
  export let standingX
  export let standingY
  export let moving = false

  let ref
  $: bounds = ref?.getBoundingClientRect()
  // $: windowBounds = document?.getBoundingClientRect()
  $: if (bounds && !moving) {
    standingX = bounds.x
    standingY = bounds.y
  }

  function onMoveStart() {
    moving = true
  }

  function onMouseMove(event) {
    if (moving) {
      right -= event.movementX
      bottom -= event.movementY
      // left += event.movementX
      // top += event.movementY
    }
  }

  function onTouchMove(event) {
    if (moving) {
      let touch = event.changedTouches[0]
      right = standingX - (touch.clientX - bounds.width)
      bottom = standingY - (touch.clientY - bounds.height)
      // top = standingY - touch.clientY
      // left = standingX - touch.clientX
    }
  }

  function onMoveEnd(event) {
    moving = false
    console.log(event)
    standingX = event.changedTouches?.[0].clientX
    standingY = event.changedTouches?.[0].clientY
  }
</script>

<section
  on:mousedown="{onMoveStart}"
  on:touchstart="{onMoveStart}"
  style="right: {right}px; bottom: {bottom}px; top: {top}px; left: {left}px;"
  {...$$props}
  bind:this="{ref}"
>
  <!-- style="right: {right}px; bottom: {bottom}px;" -->
  <slot />
</section>

<svelte:window
  on:mousemove="{onMouseMove}"
  on:touchmove="{onTouchMove}"
  on:touchend="{onMoveEnd}"
  on:mouseup="{onMoveEnd}"
/>

<style>
  section {
    user-select: none;
    touch-action: none;
    cursor: move;
    position: fixed;
  }
</style>
