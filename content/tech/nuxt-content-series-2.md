---
title: Nuxt 博客实践 · 第二篇
description: 在技术模块中实现系列文章导航与上一篇/下一篇按钮。
date: 2025-02-05
updated: 2025-02-12
version: 1.1.0
series: Nuxt 博客实践
seriesOrder: 2
tags:
  - Nuxt
  - 系列文章
---

# Nuxt 博客实践 · 第二篇

这一篇继续沿用「Nuxt 博客实践」系列，主要演示系列导航：

- 系列目录会展示在文章底部
- 当前文章会高亮
- 自动推导上一篇与下一篇

你可以参考 `app/pages/tech/[...slug].vue` 中关于 `seriesItems` 的实现逻辑，
按照同样的 Frontmatter 约定，添加更多系列文章即可。

