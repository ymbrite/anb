<script setup lang="ts">
const { data: posts } = await useAsyncData('quant-research', async () => {
  const items = await queryCollection('quant')
    .where('path', 'LIKE', '/quant/research/%')
    .select('path', 'title', 'description', 'date', 'tags')
    .order('date', 'DESC')
    .all()
  return items.map((item) => ({ ...item, _path: item.path }))
})
</script>

<template>
  <div class="container py-10 space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">研究文档</h1>
      <p class="text-muted-foreground">这里沉淀量化研究过程与结论，支持 Markdown + 代码高亮。</p>
    </div>

    <div v-if="posts?.length" class="space-y-3">
      <NuxtLink
        v-for="p in posts"
        :key="p._path"
        :to="p._path"
        class="block rounded-lg border p-6 hover:bg-accent/50 transition-colors"
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-semibold">{{ p.title }}</h2>
            <time class="text-xs text-muted-foreground">{{ new Date(p.date).toLocaleDateString() }}</time>
          </div>
          <p v-if="p.description" class="text-sm text-muted-foreground">{{ p.description }}</p>
          <div v-if="p.tags?.length" class="flex flex-wrap gap-2">
            <span
              v-for="t in p.tags"
              :key="t"
              class="rounded-full border px-3 py-1 text-xs text-muted-foreground"
            >{{ t }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="rounded-lg border p-8 text-center text-muted-foreground">
      暂无研究文档
    </div>
  </div>
</template>
