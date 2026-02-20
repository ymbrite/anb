<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)

const apply = (command: string, value?: string) => {
  if (import.meta.server) return
  document.execCommand(command, false, value)
  emit('update:modelValue', editorRef.value?.innerHTML || '')
}

const onInput = () => {
  emit('update:modelValue', editorRef.value?.innerHTML || '')
}

const insertLink = () => {
  if (import.meta.server) return
  const url = prompt('URL')
  if (!url) return
  apply('createLink', url)
}

const uploadImage = async (file: File) => {
  const form = new FormData()
  form.append('file', file)
  const { url } = await $fetch<{ url: string }>('/api/uploads/image', { method: 'POST', body: form })
  apply('insertImage', url)
}

const onPickImage = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  await uploadImage(file)
  input.value = ''
}

watch(
  () => props.modelValue,
  (v) => {
    if (!editorRef.value) return
    if (editorRef.value.innerHTML === v) return
    editorRef.value.innerHTML = v
  },
  { immediate: true },
)
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" @click="apply('bold')">B</Button>
      <Button type="button" variant="outline" size="sm" @click="apply('italic')">I</Button>
      <Button type="button" variant="outline" size="sm" @click="apply('underline')">U</Button>
      <Button type="button" variant="outline" size="sm" @click="apply('insertUnorderedList')">• List</Button>
      <Button type="button" variant="outline" size="sm" @click="insertLink">Link</Button>
      <label class="inline-flex">
        <input class="hidden" type="file" accept="image/*" @change="onPickImage">
        <Button type="button" variant="outline" size="sm" as-child>
          <span>Image</span>
        </Button>
      </label>
    </div>

    <div
      ref="editorRef"
      class="min-h-[260px] w-full rounded-md border bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring prose dark:prose-invert max-w-none"
      contenteditable="true"
      @input="onInput"
    />
  </div>
</template>

