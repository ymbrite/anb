<script setup lang="ts">
defineProps<{
  post: any
}>()
</script>

<template>
  <NuxtLink :to="post._path" class="group relative flex flex-col space-y-3 rounded-lg border p-6 hover:bg-accent/50 transition-colors">
    <div v-if="post.image" class="aspect-video w-full overflow-hidden rounded-md bg-muted">
      <img :src="post.image" :alt="post.title" class="h-full w-full object-cover transition-transform group-hover:scale-105" />
    </div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold tracking-tight">{{ post.title }}</h2>
      <p class="text-muted-foreground line-clamp-3">{{ post.description }}</p>
    </div>
    <div class="flex items-center text-sm text-muted-foreground">
      <time>{{ new Date(post.date).toLocaleDateString() }}</time>
    </div>
  </NuxtLink>
</template>
