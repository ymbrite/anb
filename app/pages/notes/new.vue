<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
import NoteEditor from '~/components/notes/NoteEditor.vue'

const title = ref('')
const mood = ref('')
const contentHtml = ref('<p></p>')
const saving = ref(false)

const save = async () => {
  if (!title.value.trim()) return
  saving.value = true
  try {
    const res = await $fetch<{ id: number }>('/api/notes', {
      method: 'POST',
      body: { title: title.value, mood: mood.value, contentHtml: contentHtml.value },
    })
    await navigateTo(`/notes/${res.id}`)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="container py-10 space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">写随笔</h1>
      <p class="text-muted-foreground">内容会保存到本地 SQLite（.data/notes.sqlite）。</p>
    </div>

    <div class="grid gap-4">
      <div class="grid gap-2">
        <label class="text-sm font-medium">标题</label>
        <input v-model="title" class="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
      </div>

      <div class="grid gap-2">
        <label class="text-sm font-medium">心情</label>
        <select v-model="mood" class="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="">无</option>
          <option value="开心">开心</option>
          <option value="平静">平静</option>
          <option value="焦虑">焦虑</option>
          <option value="低落">低落</option>
          <option value="兴奋">兴奋</option>
        </select>
      </div>

      <div class="grid gap-2">
        <label class="text-sm font-medium">正文</label>
        <ClientOnly>
          <NoteEditor v-model="contentHtml" />
        </ClientOnly>
      </div>

      <div class="flex gap-3">
        <Button :disabled="saving || !title.trim()" @click="save">保存</Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/notes">返回</NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

