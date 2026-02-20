<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
import TextReveal from '~/components/ui/text-reveal/TextReveal.vue'
import Particles from '~/components/ui/particles/Particles.vue'
import BorderBeam from '~/components/ui/border-beam/BorderBeam.vue'

const { data: posts } = await useAsyncData('home-posts', async () => {
  const items = await queryCollection('tech')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')
    .limit(3)
    .all()
  return items.map((item) => ({ ...item, _path: item.path }))
})
</script>

<template>
  <div class="container py-10 space-y-10">
    <!-- Hero Section -->
    <section class="relative mx-auto flex max-w-[980px] flex-col items-center gap-2 overflow-hidden rounded-2xl border bg-background/60 px-6 py-10 text-center md:px-10 md:py-14 lg:py-24">
      <ClientOnly>
        <Particles class="absolute inset-0" :quantity="60" :ease="70" :color="'#94a3b8'" :refresh="false" />
      </ClientOnly>
      <h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        <TextReveal :text="$t('hero.title')" class="justify-center" />
      </h1>
      <p class="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="flex gap-4 mt-4">
        <Button as-child>
          <NuxtLink to="/tech">{{ $t('hero.read_blog') }}</NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="https://github.com" target="_blank">{{ $t('hero.github') }}</NuxtLink>
        </Button>
      </div>
      <BorderBeam :size="240" :duration="12" :delay="4" />
    </section>

    <!-- Latest Posts -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold tracking-tight">{{ $t('latest_posts.title') }}</h2>
        <Button variant="ghost" as-child>
          <NuxtLink to="/tech">{{ $t('latest_posts.view_all') }}</NuxtLink>
        </Button>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PostCard v-for="post in posts" :key="post._path" :post="post" />
      </div>
    </section>
  </div>
</template>
