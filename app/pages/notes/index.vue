<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

const route = useRoute()
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : '').trim())

const { data: notes, refresh } = await useAsyncData('notes', async () => {
  return $fetch<any[]>('/api/notes', { query: q.value ? { q: q.value } : undefined })
})

watch(q, () => refresh())
</script>

<template>
  <div class="container py-10 space-y-8">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">随笔</h1>
        <p class="text-muted-foreground">富文本编辑、图片上传、心情标签与阅读时长统计。</p>
      </div>
      <Button as-child>
        <NuxtLink to="/notes/new">写一篇</NuxtLink>
      </Button>
    </div>

    <div class="flex items-center gap-3">
      <input
        :value="q"
        class="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
        placeholder="搜索随笔"
        @input="$router.replace({ query: { ...$route.query, q: ($event.target as HTMLInputElement).value || undefined } })"
      >
    </div>

    <div v-if="notes?.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="n in notes"
        :key="n.id"
        :to="`/notes/${n.id}`"
        class="rounded-lg border p-6 hover:bg-accent/50 transition-colors"
      >
        <div class="space-y-2">
          <h2 class="text-xl font-semibold">{{ n.title }}</h2>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span v-if="n.mood" class="rounded-full border px-2 py-0.5">{{ n.mood }}</span>
            <span>{{ n.readingMinutes }} 分钟</span>
            <span>{{ new Date(n.updatedAt).toLocaleDateString() }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="rounded-lg border p-8 text-center text-muted-foreground">
      暂无随笔
    </div>
  </div>
</template>

