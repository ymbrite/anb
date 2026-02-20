<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

const route = useRoute()
const id = computed(() => Number(route.params.id))

const { data: note, refresh } = await useAsyncData(`note:${route.params.id}`, async () => {
  return $fetch<any>(`/api/notes/${route.params.id}`)
})

watch(() => route.params.id, () => refresh())
</script>

<template>
  <div class="container py-10 space-y-8">
    <div v-if="note" class="space-y-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-2">
          <h1 class="text-4xl font-bold tracking-tight">{{ note.title }}</h1>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span v-if="note.mood" class="rounded-full border px-3 py-1 text-xs">{{ note.mood }}</span>
            <span>{{ note.readingMinutes }} 分钟</span>
            <time>更新：{{ new Date(note.updatedAt).toLocaleString() }}</time>
          </div>
        </div>
        <div class="flex gap-2">
          <Button variant="outline" as-child>
            <NuxtLink to="/notes">列表</NuxtLink>
          </Button>
          <Button as-child>
            <NuxtLink :to="`/notes/${note.id}/edit`">编辑</NuxtLink>
          </Button>
        </div>
      </div>

      <div class="prose dark:prose-invert max-w-none" v-html="note.contentHtml" />
    </div>

    <div v-else class="rounded-lg border p-8 text-center text-muted-foreground">
      未找到随笔
    </div>
  </div>
</template>

