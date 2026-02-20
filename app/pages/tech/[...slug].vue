<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

const { path } = useRoute()

const { data: doc } = await useAsyncData(`tech:${path}`, async () => {
  return queryCollection('tech').path(path).first()
})

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

const tags = computed(() => (Array.isArray(doc.value?.tags) ? doc.value.tags : []) as string[])

const { data: seriesItems } = await useAsyncData(`tech-series:${path}`, async () => {
  if (!doc.value?.series) return []
  const items = await queryCollection('tech')
    .where('series', '=', doc.value.series)
    .select('path', 'title', 'seriesOrder')
    .order('seriesOrder', 'ASC')
    .all()
  return items.map((item) => ({ ...item, _path: item.path }))
})

const seriesIndex = computed(() => {
  const items = seriesItems.value ?? []
  return items.findIndex((i: any) => i._path === doc.value?._path)
})

const prevInSeries = computed(() => {
  const items = seriesItems.value ?? []
  const idx = seriesIndex.value
  if (idx <= 0) return null
  return items[idx - 1]
})

const nextInSeries = computed(() => {
  const items = seriesItems.value ?? []
  const idx = seriesIndex.value
  if (idx < 0 || idx >= items.length - 1) return null
  return items[idx + 1]
})
</script>

<template>
  <article class="container py-10 space-y-8">
    <header class="space-y-3">
      <h1 class="text-4xl font-bold tracking-tight">{{ doc.title }}</h1>
      <p v-if="doc.description" class="text-muted-foreground text-lg">{{ doc.description }}</p>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <time v-if="doc.date">发布：{{ new Date(doc.date).toLocaleDateString() }}</time>
        <time v-if="doc.updated">更新：{{ new Date(doc.updated).toLocaleDateString() }}</time>
        <span v-if="doc.version">版本：{{ doc.version }}</span>
        <span v-if="doc.series">系列：{{ doc.series }}</span>
      </div>
      <div v-if="tags.length" class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="t in tags"
          :key="t"
          class="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          :to="{ path: '/tech', query: { tag: t } }"
        >
          {{ t }}
        </NuxtLink>
      </div>
    </header>

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="doc" />
    </div>

    <section v-if="doc.series && seriesItems?.length" class="space-y-3">
      <h2 class="text-xl font-bold">系列教程</h2>
      <div class="flex flex-col gap-2">
        <NuxtLink
          v-for="item in seriesItems"
          :key="item._path"
          :to="item._path"
          class="rounded-md border px-4 py-2 text-sm hover:bg-accent/50 transition-colors"
          :class="item._path === doc._path ? 'bg-accent/50' : ''"
        >
          <span class="text-muted-foreground mr-2">#{{ item.seriesOrder ?? '-' }}</span>
          <span class="font-medium">{{ item.title }}</span>
        </NuxtLink>
      </div>
      <div class="flex items-center justify-between pt-2">
        <Button v-if="prevInSeries" variant="outline" as-child>
          <NuxtLink :to="prevInSeries._path">上一篇</NuxtLink>
        </Button>
        <div v-else></div>
        <Button v-if="nextInSeries" as-child>
          <NuxtLink :to="nextInSeries._path">下一篇</NuxtLink>
        </Button>
      </div>
    </section>
  </article>
</template>
