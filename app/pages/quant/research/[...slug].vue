<script setup lang="ts">
const { path } = useRoute()

const { data: doc } = await useAsyncData(`quant:${path}`, async () => {
  return queryCollection('quant').path(path).first()
})

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}
</script>

<template>
  <article class="container py-10 space-y-8">
    <header class="space-y-3">
      <h1 class="text-4xl font-bold tracking-tight">{{ doc.title }}</h1>
      <p v-if="doc.description" class="text-muted-foreground text-lg">{{ doc.description }}</p>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <time v-if="doc.date">发布：{{ new Date(doc.date).toLocaleDateString() }}</time>
        <time v-if="doc.updated">更新：{{ new Date(doc.updated).toLocaleDateString() }}</time>
      </div>
    </header>

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="doc" />
    </div>
  </article>
</template>
