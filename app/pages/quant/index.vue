<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
import MagicCard from '~/components/ui/magic-card/MagicCard.vue'

const { data: health } = await useFetch('/api/quant/health')
</script>

<template>
  <div class="container py-10 space-y-10">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">量化研究</h1>
      <p class="text-muted-foreground">
        这里聚合研究文档与工具接口，后续可接入实时数据、策略监控与组合追踪。
      </p>
      <p v-if="health?.ok" class="text-xs text-muted-foreground">
        API: OK · {{ health.now }}
      </p>
    </div>

    <ClientOnly>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MagicCard class="p-0">
          <NuxtLink to="/quant/research" class="flex h-full flex-col rounded-xl p-6 transition-colors hover:bg-accent/50">
            <div class="space-y-2">
              <h2 class="text-xl font-semibold">研究文档</h2>
              <p class="text-sm text-muted-foreground">Markdown 研究笔记与策略实验记录</p>
            </div>
          </NuxtLink>
        </MagicCard>
        <MagicCard class="p-0">
          <NuxtLink to="/quant/dashboard" class="flex h-full flex-col rounded-xl p-6 transition-colors hover:bg-accent/50">
            <div class="space-y-2">
              <h2 class="text-xl font-semibold">实时数据面板</h2>
              <p class="text-sm text-muted-foreground">预留数据源接入与可视化组件位</p>
            </div>
          </NuxtLink>
        </MagicCard>
        <MagicCard class="p-0">
          <NuxtLink to="/quant/portfolio" class="flex h-full flex-col rounded-xl p-6 transition-colors hover:bg-accent/50">
            <div class="space-y-2">
              <h2 class="text-xl font-semibold">组合追踪</h2>
              <p class="text-sm text-muted-foreground">预留仓位、风险与归因分析模块</p>
            </div>
          </NuxtLink>
        </MagicCard>
      </div>
    </ClientOnly>

    <div class="flex">
      <Button as-child>
        <NuxtLink to="/quant/research">进入研究文档</NuxtLink>
      </Button>
    </div>
  </div>
</template>
