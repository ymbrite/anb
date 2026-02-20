<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  text: string
  duration?: number
  delay?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.5,
  delay: 0.05,
  class: '',
})

const words = props.text.split(' ')
</script>

<template>
  <div :class="cn('flex flex-wrap gap-2', props.class)">
    <span v-for="(word, i) in words" :key="i" class="relative overflow-hidden inline-flex">
      <span
        v-motion
        :initial="{ y: '100%' }"
        :visible="{ 
          y: 0,
          transition: {
            duration: props.duration * 1000,
            delay: i * props.delay * 1000,
            ease: 'easeOut'
          }
        }"
        class="inline-block"
      >
        {{ word }}
      </span>
    </span>
  </div>
</template>
