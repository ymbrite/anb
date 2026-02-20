<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useWindowSize, useMouse } from '@vueuse/core'

interface Props {
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

const props = withDefaults(defineProps<Props>(), {
  quantity: 30,
  staticity: 50,
  ease: 50,
  refresh: false,
  color: '#ffffff',
  vx: 0,
  vy: 0,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const circles = ref<any[]>([])
const { width, height } = useWindowSize()
const { x: mouseX, y: mouseY } = useMouse()
const canvasSize = ref({ w: 0, h: 0 })
const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

function initCanvas() {
  resizeCanvas()
  drawParticles()
}

function resizeCanvas() {
  if (canvasRef.value && context.value) {
    circles.value.length = 0
    canvasSize.value.w = width.value
    canvasSize.value.h = height.value
    canvasRef.value.width = width.value * dpr
    canvasRef.value.height = height.value * dpr
    canvasRef.value.style.width = `${width.value}px`
    canvasRef.value.style.height = `${height.value}px`
    context.value.scale(dpr, dpr)
  }
}

function circleParams() {
  const x = Math.floor(Math.random() * canvasSize.value.w)
  const y = Math.floor(Math.random() * canvasSize.value.h)
  const translateX = 0
  const translateY = 0
  const size = Math.floor(Math.random() * 2) + 0.1
  const alpha = 0
  const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
  const dx = (Math.random() - 0.5) * 0.2
  const dy = (Math.random() - 0.5) * 0.2
  const magnetism = 0.1 + Math.random() * 4
  return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism }
}

function drawCircle(circle: any, update = false) {
  if (context.value) {
    const { x, y, translateX, translateY, size, alpha } = circle
    context.value.translate(translateX, translateY)
    context.value.beginPath()
    context.value.arc(x, y, size, 0, 2 * Math.PI)
    context.value.fillStyle = `rgba(${hexToRgb(props.color).join(', ')}, ${alpha})`
    context.value.fill()
    context.value.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (!update) circles.value.push(circle)
  }
}

function clearContext() {
  if (context.value) {
    context.value.clearRect(0, 0, canvasSize.value.w, canvasSize.value.h)
  }
}

function drawParticles() {
  clearContext()
  for (let i = 0; i < props.quantity; i++) {
    const circle = circleParams()
    drawCircle(circle)
  }
}

function remapValue(value: number, start1: number, end1: number, start2: number, end2: number): number {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

function animate() {
  clearContext()
  circles.value.forEach((circle: any, i: number) => {
    // Handle edge collision
    const edge = [
      circle.x + circle.translateX - circle.size,
      canvasSize.value.w - circle.x - circle.translateX - circle.size,
      circle.y + circle.translateY - circle.size,
      canvasSize.value.h - circle.y - circle.translateY - circle.size,
    ]
    const closestEdge = edge.reduce((a, b) => Math.min(a, b))
    const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
    
    if (remapClosestEdge > 1) {
      circle.alpha += 0.02
      if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha
    } else {
      circle.alpha = circle.targetAlpha * remapClosestEdge
    }

    circle.x += circle.dx + props.vx
    circle.y += circle.dy + props.vy
    circle.translateX += ((mouseX.value / (props.staticity / circle.magnetism)) - circle.translateX) / props.ease
    circle.translateY += ((mouseY.value / (props.staticity / circle.magnetism)) - circle.translateY) / props.ease

    // Loop particles
    if (circle.x < -circle.size) circle.x += canvasSize.value.w + circle.size
    else if (circle.x > canvasSize.value.w + circle.size) circle.x -= canvasSize.value.w + circle.size
    
    if (circle.y < -circle.size) circle.y += canvasSize.value.h + circle.size
    else if (circle.y > canvasSize.value.h + circle.size) circle.y -= canvasSize.value.h + circle.size

    drawCircle(circle, true)
  })
  requestAnimationFrame(animate)
}

function hexToRgb(hex: string) {
  hex = hex.replace('#', '')
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

onMounted(() => {
  if (canvasRef.value) {
    context.value = canvasRef.value.getContext('2d')
  }
  initCanvas()
  animate()
})

watch([width, height], () => {
  initCanvas()
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
</template>
