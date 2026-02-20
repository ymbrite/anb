---
title: 使用 Nuxt Content 搭建技术博客
description: 从零搭建一个基于 Nuxt Content 的技术文章系统示例。
date: 2025-02-01
updated: 2025-02-10
version: 1.0.0
series: Nuxt 博客实践
seriesOrder: 1
tags:
  - Nuxt
  - Content
  - 博客
---

# 使用 Nuxt Content 搭建技术博客

这一篇示例文章演示「技术模块」的基本用法：

- 使用 `content/tech` 目录存放 Markdown 文章
- 在 Frontmatter 中维护 `tags`、`series`、`version` 等元信息
- 在 `/tech` 列表页中支持搜索、标签过滤与系列展示

## 目录结构

```text
content/
  tech/
    nuxt-content-basics.md
    nuxt-content-series-2.md
```

## Frontmatter 约定

- `title`: 文章标题
- `description`: 简要说明
- `date`: 首次发布时间（字符串即可）
- `updated`: 最近更新时间
- `version`: 当前版本号
- `series` + `seriesOrder`: 归属于哪个系列，以及在系列中的顺序
- `tags`: 便于列表页过滤的标签数组

