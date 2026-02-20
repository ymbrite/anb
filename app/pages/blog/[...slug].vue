<script setup lang="ts">
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug || '')

await navigateTo(`/tech/${slug}`, { redirectCode: 301 })
</script>

<template>
  <main />
</template>
