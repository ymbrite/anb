<script setup lang="ts">
import { Mail, Github, AtSign, MessageCircle, Smartphone, Globe } from 'lucide-vue-next'
import TextReveal from '~/components/ui/text-reveal/TextReveal.vue'
import MagicCard from '~/components/ui/magic-card/MagicCard.vue'
import BorderBeam from '~/components/ui/border-beam/BorderBeam.vue'
import Meteors from '~/components/ui/meteors/Meteors.vue'
import Button from '~/components/ui/button/Button.vue'

const cards = [
  {
    title: '关注方向',
    description: 'Web 应用架构、设计系统、交互体验与性能优化。',
  },
  {
    title: '技术栈',
    description: 'Nuxt、Vue、TypeScript、Tailwind CSS、Node.js。',
  },
  {
    title: '习惯与节奏',
    description: '快速原型与持续迭代，强调可维护性与体验一致性。',
  },
]
</script>

<template>
  <div class="container py-10 space-y-10">
    <section class="relative overflow-hidden rounded-2xl border bg-background p-6 md:p-10">
      <ClientOnly>
        <Meteors :number="18" />
      </ClientOnly>
      <div class="relative z-10 max-w-2xl space-y-4">
        <TextReveal text="Build with clarity. Ship with care." class="text-sm font-medium text-muted-foreground" />
        <h1 class="text-3xl font-bold tracking-tight md:text-4xl">
          {{ $t('about.title') }}
        </h1>
        <p class="text-muted-foreground">
          这是一个面向创作与沉淀的多功能博客系统，集成技术文章、量化研究、随笔与展示模块，
          支持暗色模式、国际化、内容检索与高亮渲染，强调一致的阅读体验与可扩展的信息结构。
        </p>
        <p class="text-muted-foreground">
          我是浮屠，专注于技术、AI、量化。
          这里记录长期实践、实验复盘与思考片段，也欢迎一起交流想法与合作可能。
        </p>
        <div class="flex flex-wrap gap-3">
          <Button as-child>
            <a href="mailto:greatwallheng@gmail.com" class="inline-flex items-center gap-2">
              <Mail class="h-4 w-4" />
              Gmail
            </a>
          </Button>
          <Button variant="outline" as-child>
            <a href="https://github.com/algebrahcc" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2">
              <Github class="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button variant="outline" as-child>
            <a href="https://x.com/hngzhngchn55417" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2">
              <AtSign class="h-4 w-4" />
              X
            </a>
          </Button>
          <Button variant="outline" as-child>
            <a href="https://www.xiaohongshu.com/user/profile/61f3a3200000000010005103" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2">
              <Smartphone class="h-4 w-4" />
              小红书
            </a>
          </Button>
          <Button variant="outline" as-child>
            <a href="https://qm.qq.com/q/yourcode" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2">
              <MessageCircle class="h-4 w-4" />
              QQ
            </a>
          </Button>
          <Button variant="outline" as-child>
            <a href="https://weixin.qq.com/" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2">
              <Globe class="h-4 w-4" />
              微信
            </a>
          </Button>
        </div>
      </div>
      <BorderBeam :size="220" :duration="10" :delay="6" />
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <ClientOnly>
        <div class="grid gap-4 md:grid-cols-3">
          <MagicCard v-for="card in cards" :key="card.title" class="p-6">
            <h3 class="text-lg font-semibold">{{ card.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ card.description }}</p>
          </MagicCard>
        </div>
      </ClientOnly>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border p-6">
        <div class="text-sm text-muted-foreground">合作方向</div>
        <div class="mt-2 text-lg font-semibold">产品体验、可视化、数据工具</div>
        <p class="mt-2 text-sm text-muted-foreground">欢迎交流想法、原型与落地方案。</p>
      </div>
      <div class="rounded-xl border p-6">
        <div class="text-sm text-muted-foreground">更新方式</div>
        <div class="mt-2 text-lg font-semibold">技术文章 + 研究记录 + 随笔</div>
        <p class="mt-2 text-sm text-muted-foreground">持续沉淀过程与复盘。</p>
      </div>
    </section>
  </div>
</template>
