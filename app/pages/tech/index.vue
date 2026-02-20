<script setup lang="ts">
const route = useRoute()

const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : '').trim())
const tag = computed(() => (typeof route.query.tag === 'string' ? route.query.tag : '').trim())

const { data: posts } = await useAsyncData('tech-posts', async () => {
  const items = await queryCollection('tech')
    .select('path', 'title', 'description', 'date', 'updated', 'version', 'tags', 'series', 'seriesOrder')
    .order('date', 'DESC')
    .all()
  return items.map((item) => ({ ...item, _path: item.path }))
})

const filtered = computed(() => {
  const list = posts.value ?? []
  const query = q.value.toLowerCase()
  const tagFilter = tag.value.toLowerCase()

  return list.filter((p: any) => {
    if (tagFilter) {
      const tags = Array.isArray(p.tags) ? p.tags : []
      if (!tags.some((t: string) => t.toLowerCase() === tagFilter)) return false
    }

    if (!query) return true

    const haystack = [
      p.title,
      p.description,
      Array.isArray(p.tags) ? p.tags.join(' ') : '',
      p.series,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(query)
  })
})
</script>

<template>
  <div class="container py-10 space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">技术文章</h1>
      <p class="text-muted-foreground">支持标签、搜索、系列教程与版本字段。</p>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        :value="q"
        class="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
        placeholder="搜索标题 / 描述 / 标签 / 系列"
        @input="$router.replace({ query: { ...$route.query, q: ($event.target as HTMLInputElement).value || undefined } })"
      >
      <div v-if="tag" class="text-sm text-muted-foreground">
        当前标签：<span class="font-medium text-foreground">{{ tag }}</span>
        <NuxtLink class="ml-2 underline underline-offset-4" to="/tech">清除</NuxtLink>
      </div>
    </div>

    <div v-if="filtered.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in filtered" :key="post._path" :post="post" />
    </div>

    <div v-else class="rounded-lg border p-8 text-center text-muted-foreground">
      没有找到匹配的文章
    </div>
  </div>
</template>
