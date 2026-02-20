<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t">
    <div class="container flex flex-col gap-2 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span>© {{ year }} {{ $t('brand.title') }}</span>
        <span class="text-muted-foreground/50">·</span>
        <i18n-t keypath="footer.built_by" tag="span">
          <NuxtLink to="/about" class="font-medium underline underline-offset-4">浮屠</NuxtLink>
        </i18n-t>
        <span class="text-muted-foreground/50">·</span>
        <i18n-t keypath="footer.source_code" tag="span">
          <a href="https://github.com" target="_blank" rel="noreferrer" class="font-medium underline underline-offset-4">GitHub</a>
        </i18n-t>
      </div>
      <NuxtLink to="/about" class="hover:text-foreground">{{ $t('nav.about') }}</NuxtLink>
    </div>
  </footer>
</template>
