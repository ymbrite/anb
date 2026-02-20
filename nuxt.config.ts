// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@nuxtjs/color-mode', '@nuxt/content', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '浮屠的博客',
      titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} · 浮屠的博客` : '浮屠的博客'),
      meta: [
        { name: 'description', content: '技术文章、量化研究与随笔记录的个人博客系统。' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:site_name', content: '浮屠的博客' },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh', name: '简体中文', file: 'zh.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'zh',
    strategy: 'no_prefix'
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
