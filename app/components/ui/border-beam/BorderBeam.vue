<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  duration?: number
  size?: number
  class?: string
  colorFrom?: string
  colorTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 10,
  size: 300,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
})
</script>

<template>
  <div
    :class="cn(
      'pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]',
      props.class,
    )"
  >
    <div
      class="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
      :style="{
        width: `${props.size}px`,
        '--color-from': props.colorFrom,
        '--color-to': props.colorTo,
        animation: `border-beam ${props.duration}s infinite linear`,
        offsetAnchor: 'calc(var(--offset) * 1%) 50%',
        offsetPath: 'rect(0 auto auto 0 round calc(var(--radius) + 4px))', 
      }"
    />
  </div>
</template>

<style scoped>
@keyframes border-beam {
  to {
    offset-distance: 100%;
  }
}
</style>
