# 浮屠的博客 - Nuxt 4 Modern Blog

基于 Nuxt 4 构建的多功能个人博客项目，集成了 Tailwind CSS、Inspira UI 与 i18n，旨在提供流畅的用户体验和可扩展的内容架构。

## 🛠️ 技术栈

- **框架**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件库**: [Inspira UI](https://inspira-ui.com/) (基于 Shadcn Vue & Radix Vue)
- **图标**: [Lucide Vue](https://lucide.dev/)
- **动画**: [@vueuse/motion](https://motion.vueuse.org/) & `tailwindcss-animate`
- **内容管理**: [@nuxt/content](https://content.nuxt.com/) (Markdown)
- **国际化**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **测试**: Vitest
- **包管理器**: pnpm

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000` 查看效果。

### 构建生产环境

```bash
pnpm build
```

## 🧭 模块与路由

- 技术文章：`/tech`（Markdown + 代码高亮 + 标签/搜索/系列/版本字段）
- 量化研究：`/quant`（研究文档：`/quant/research`，面板占位：`/quant/dashboard`，组合追踪：`/quant/portfolio`）
- 随笔系统：`/notes`（富文本 + 图片上传 + 心情 + 阅读时长；数据保存在 `.data/notes.sqlite`）
- 动效展示：`/showcase`

## 🧪 测试

```bash
pnpm test
pnpm test:coverage
```

## ✅ 进度与计划 (To-Do List)

### 阶段一：基础架构搭建 (已完成)
- [x] 项目初始化 (Nuxt 4)
- [x] 集成 Tailwind CSS
- [x] 集成 Inspira UI 基础依赖 (clsx, tailwind-merge, cva)
- [x] 配置 Shadcn Vue 全局样式与 CSS 变量
- [x] 实现基础 UI 组件 (Button)
- [x] 配置动画库 (@vueuse/motion)

### 阶段二：布局与核心功能 (已完成)
- [x] **全局布局设计**
  - [x] Header (Logo, 导航菜单, 主题切换)
  - [x] Footer (版权信息, 社交链接)
  - [x] 移动端响应式菜单
- [x] **暗黑模式支持**
  - [x] 集成 `@nuxtjs/color-mode`
  - [x] 实现主题切换逻辑 (Header 集成 ThemeToggle)
- [x] **博客内容系统**
  - [x] 集成 `@nuxt/content` 模块
  - [x] 配置 Markdown 渲染样式 (Typography)
  - [x] 修复 Windows 环境下 `better-sqlite3` 构建问题
- [x] **国际化支持 (i18n)**
  - [x] 集成 `@nuxtjs/i18n`
  - [x] 实现语言切换功能 (中英文)
  - [x] 国际化资源配置 (`locales/zh.json`, `locales/en.json`)

### 阶段三：页面开发 (已完成)
- [x] **首页 (Home)**
  - [x] Hero Section (介绍与 Slogan)
  - [x] 最新文章列表 (Card 布局)
- [x] **文章列表页 (Blog)**
  - [x] 文章网格展示
  - [x] 响应式布局
- [x] **文章详情页 (Post)**
  - [x] 文章内容渲染 (`<ContentRenderer>`)
  - [x] Frontmatter 信息展示 (日期, 标签, 封面图)
  - [x] 404 处理
- [x] **关于页 (About)**
- [x] **Inspira UI 展示页 (Showcase)**
  - [x] Particles (粒子效果)
  - [x] Text Reveal (文字揭示)
  - [x] Magic Card (光效卡片)
  - [x] Meteors (流星背景)
  - [x] Border Beam (边框流光)

### 阶段四：优化与部署 (待完成)
- [x] SEO 基础 (Meta Tags, robots.txt, sitemap.xml)
- [ ] 性能优化 (图片懒加载, 代码分割)
- [ ] 部署配置 (Vercel / Netlify / Docker)

## 📂 目录结构

```
d:\CodeArea\HCC\nuxt-blog\csyblog-nuxt4\
├── app/
│   ├── assets/          # 静态资源 (CSS, Images)
│   ├── components/      # Vue 组件 (UI, Layout components)
│   ├── layouts/         # 页面布局 (Default layout)
│   ├── lib/             # 工具函数 (utils.ts)
│   ├── pages/           # 页面路由 (Home, Tech, Quant, Notes, Showcase, About)
│   ├── plugins/         # Nuxt 插件
│   ├── server/          # API 路由 (notes, uploads, quant)
│   └── app.vue          # 应用入口
├── content/             # Markdown 内容 (tech, quant)
├── i18n/                # 国际化资源
│   └── locales/         # 语言文件 (en.json, zh.json)
├── public/              # 公共静态文件
│   ├── robots.txt
│   └── sitemap.xml
├── nuxt.config.ts       # Nuxt 配置文件 (srcDir: 'app')
├── content.config.ts    # Nuxt Content collections 配置
├── tailwind.config.ts   # Tailwind 配置文件
└── package.json
```

## 📄 License

MIT
