<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { ref, computed } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: string
  gradientColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  gradientColor: '#262626',
})

const cardRef = ref<HTMLElement | null>(null)
const { elementX, elementY } = useMouseInElement(cardRef)

const mouseX = computed(() => elementX.value ?? 0)
const mouseY = computed(() => elementY.value ?? 0)
</script>

<template>
  <div
    ref="cardRef"
    :class="cn(
      'group relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow',
      props.class
    )"
  >
    <div
      class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${props.gradientColor}, transparent 40%)`,
      }"
    />
    <div class="relative h-full">
      <slot />
    </div>
  </div>
</template>
