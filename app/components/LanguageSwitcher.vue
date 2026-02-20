<script setup lang="ts">
import { Languages } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})

const toggleLocale = () => {
  const nextLocale = availableLocales.value[0]?.code
  if (nextLocale) {
    setLocale(nextLocale)
  }
}
</script>

<template>
  <Button variant="ghost" size="icon" class="relative" @click="toggleLocale" :title="$t('language.select')">
    <Languages class="h-[1.2rem] w-[1.2rem]" />
    <span class="sr-only">{{ $t('language.select') }}</span>
    <span class="absolute bottom-0 right-0 rounded-sm bg-background/80 px-0.5 text-[10px] font-bold leading-none">
      {{ locale.toUpperCase() }}
    </span>
  </Button>
</template>
