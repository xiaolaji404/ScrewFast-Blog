# ScrewFast

[English](README.md) | 简体中文

![ScrewFast 落地页](https://github.com/mearashadowfax/ScrewFast/assets/125820963/cdf299bd-414a-4a2d-baf0-d188bb4709c7)

ScrewFast 是基于 [Astro](https://astro.build/)、[Tailwind CSS](https://tailwindcss.com/) 和 [Preline UI](https://preline.co/) 构建的开源网站模板。一个仓库里集成了落地页、博客、产品页和完整的文档站，你只需编辑内容和 props 就能上线一套完整的网站，而无需从零构建页面。与单一用途的落地页或博客主题不同，它内置了 SEO 元数据、i18n、安全响应头和 CI 流水线。

在线演示：[screwfast.uk](https://screwfast.uk)

- **四大站点类型合一。** 落地页、博客、产品目录和 [Starlight](https://starlight.astro.build/) 文档站，共享同一套布局、导航栏和页脚。
- **现成的组件。** 页面区块（hero、功能、定价、用户评价、FAQ、mega menu）和 UI 元件（卡片、表单、模态框、按钮、图标）。
- **多语言开箱即用。** 英语和法语营销页面；文档支持 7 种语言（en、de、es、fa、fr、ja、zh-CN）并支持 RTL。只需要一种语言？使用 [`monolingual-site`](https://github.com/mearashadowfax/ScrewFast/tree/monolingual-site) 分支。
- **SEO 已处理。** 集中式标题/描述/Open Graph 配置、JSON-LD 结构化数据、自动生成的 sitemap 和 `robots.txt`。
- **生产级强化。** 通过 `vercel.json` 配置的 Content Security Policy 和其他安全响应头、构建后 HTML 压缩，以及每次推送都会进行类型检查、构建和冒烟测试的 CI 流水线。
- **当前技术栈。** Astro 7、Tailwind CSS 4、Preline 5、TypeScript 6。Dependabot 会保持更新。
- **对 AI 助手友好。** [`AI_GUIDE.md`](AI_GUIDE.md) 告诉 Cursor、Copilot 和 Claude 代码在哪里、应遵循哪些约定。
- **MIT 许可。** GitHub 上 1.4k stars、380+ forks。

页面由区块通过普通 props 组合而成：

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import HeroSection from '@components/sections/landing/HeroSection.astro';
---

<MainLayout title="Acme Tools">
  <HeroSection
    title="Equip Your Projects with Acme"
    subTitle="Top-quality hardware tools for every project need."
    primaryBtn="Start Exploring"
    primaryBtnURL="/products"
  />
</MainLayout>
<!-- 渲染出一个完整的页面：导航栏 + hero + 页脚 -->
```

---

## 中文文档

- [改造指南：把 ScrewFast 变成你自己的博客](docs/customization.md) —— 从站点身份、品牌视觉到部署上线的完整改造步骤
- [开发与维护帮助文档](docs/development.md) —— 架构、约定、常见任务与故障排查
- [AI 指南（中文）](AI_GUIDE.zh-CN.md) —— 给 AI 编程助手的项目结构与约定说明
- [领域术语表（中文）](CONTEXT.zh-CN.md) —— 代码库核心概念的命名与含义
- [行为准则（中文）](CODE_OF_CONDUCT.zh-CN.md) —— 社区行为规范

---

## 目录

- [快速开始](#快速开始)
- [改造成你自己的站点](#改造成你自己的站点)
  - [站点名称、SEO 与 Open Graph](#站点名称seo-与-open-graph)
  - [导航与页脚](#导航与页脚)
  - [页面与区块](#页面与区块)
  - [博客、产品与 Insights](#博客产品与-insights)
  - [文档（Starlight）](#文档starlight)
  - [语言](#语言)
  - [图标](#图标)
- [部署](#部署)
- [项目结构](#项目结构)
- [深入原理](#深入原理)
  - [平滑滚动（Lenis）](#平滑滚动lenis)
  - [动画（GSAP）](#动画gsap)
  - [隐藏滚动条](#隐藏滚动条)
  - [SEO 与结构化数据](#seo-与结构化数据)
  - [表单](#表单)
  - [robots.txt 与 sitemap](#robotstxt-与-sitemap)
  - [Markdown、MDX 与图片粘贴](#markdownmdx-与图片粘贴)
  - [HTML 压缩](#html-压缩)
  - [安全响应头](#安全响应头)
  - [代码格式化](#代码格式化)
- [参与贡献](#参与贡献)
- [许可证](#许可证)

---

## 快速开始

你需要 **Node.js 22** 和 **pnpm 9 或更新版本**（CI 使用的版本）。

**1. 创建你的仓库。** 点击 [GitHub 页面](https://github.com/mearashadowfax/ScrewFast)顶部的 **Use this template**，或直接克隆：

```bash
git clone https://github.com/mearashadowfax/ScrewFast.git my-site
cd my-site
```

**2. 安装依赖：**

```bash
pnpm install
```

**3. 启动开发服务器：**

```bash
pnpm dev
```

打开 <http://localhost:4321>。编辑任何文件都会自动刷新页面。

**4. 构建生产版本：**

```bash
pnpm build
```

这会运行 `astro check`（类型检查）、把站点构建到 `dist/` 并压缩 HTML。用 `pnpm preview` 预览构建结果，或运行 `pnpm test:smoke` 启动 `dist/` 并验证关键路由能否正常响应。

> [!TIP]
> 只需要一种语言？[`monolingual-site`](https://github.com/mearashadowfax/ScrewFast/tree/monolingual-site) 分支已移除法语页面和 i18n 相关代码。

---

## 改造成你自己的站点

### 站点名称、SEO 与 Open Graph

站点级配置都在 [`src/data_files/constants.ts`](src/data_files/constants.ts)：

```ts
export const SITE = {
  title: 'ScrewFast',
  tagline: 'Top-quality Hardware Tools',
  description: '...',
  url: 'https://screwfast.uk',
  author: 'Emil Gulamov',
};

export const OG = { image: ogImageSrc };
```

各语言的文本（站点描述、Open Graph 标题/描述）位于 [`src/copy/`](src/copy/) 下的文案表。修改 `SITE` 后，每个页面的 `<head>` 都会同步更新。同时要更新 [`astro.config.mjs`](astro.config.mjs) 中的 `site`，让 sitemap 和 `robots.txt` 指向你的域名。

### 导航与页脚

链接结构（id、未本地化的路径、社交 URL）统一定义在 [`src/data_files/navigation.ts`](src/data_files/navigation.ts)；每个 id 的标签位于各语言文案表的 `nav` 块中——[`src/copy/en.ts`](src/copy/en.ts) 和 [`src/copy/fr.ts`](src/copy/fr.ts)。导航栏和页脚会为当前语言自动给路径加前缀：

```ts
// src/data_files/navigation.ts
export const navLinks = [
  { id: 'home', path: '/' },
  { id: 'products', path: '/products' },
  { id: 'blog', path: '/blog' },
];
export const footerSections = [
  { id: 'company', links: [{ id: 'careers', path: '#', badge: 'hiring' }] },
];

// src/copy/en.ts
nav: {
  labels: { home: 'Home', products: 'Products', blog: 'Blog' },
  footer: { sectionTitles: { company: 'Company' }, links: { careers: 'Careers' } },
},
```

模板内置了两个导航栏，位于 `src/components/sections/navbar&footer/`：`Navbar.astro`（标准版）和 `NavbarMegaMenu.astro`（Services 链接上的 mega menu，链接在 `src/data_files/mega_link.ts`）。在 [`src/layouts/MainLayout.astro`](src/layouts/MainLayout.astro) 中替换即可切换。

![ScrewFast mega menu](https://github.com/user-attachments/assets/690482af-f1a4-4ebf-be58-eca0b5862973)

### 页面与区块

每个路由在 `src/views/` 中对应一个视图（例如 [`HomeView.astro`](src/views/HomeView.astro)），它组合 `src/components/sections/` 中的区块并将内容作为 props 传递。`src/pages/` 和 `src/pages/fr/` 中的文件只是"一行壳"，为各自的语言渲染视图，因此一个页面只需编辑一次即可支持所有语言。

视图从 [`src/copy/`](src/copy/) 的文案表读取文本（`home`、`services`、`contact` 等）；编辑这些即可修改页面内容。FAQ、功能点和定价档位等可复用数据以 JSON 形式存放在 `src/data_files/` 中，并通过同一批文案表以 `data` 暴露。

### 博客、产品与 Insights

内容是 `src/content/{blog,products,insights}/{en,fr}/` 中的 Markdown/MDX 文件。Schema 在 [`src/content.config.ts`](src/content.config.ts) 中定义。一篇博客文章长这样：

```md
---
title: "Maximizing Efficiency with ScrewFast's Cutting-Edge Tools"
description: 'Innovating Construction Efficiency with Precision Tools & Support'
author: 'Jacob'
authorImage: '@/images/blog/jacob.avif'
pubDate: 2024-02-06
cardImage: '@/images/blog/post-1.avif'
readTime: 4
tags: ['tools', 'construction', 'workflow']
---

正文写在这里。
```

博客文章自带社交分享按钮、基于 `localStorage` 的书签按钮和反馈组件（仅 UI，无后端）。Insights 页面带有目录和滚动进度指示器。

### 文档（Starlight）

文档位于 `src/content/docs/`，由 [Starlight](https://starlight.astro.build/) 在 `/welcome-to-docs/` 提供服务。侧边栏、语言和自定义组件在 [`astro.config.mjs`](astro.config.mjs) 的 `starlight()` 块中配置。Starlight 自带搜索、暗色模式、代码高亮和响应式导航。

> [!IMPORTANT]
> 如果文档侧边栏无法滚动，请从 `src/components/ui/starlight/Head.astro` 中移除 Lenis 的 `<script>`。

### 语言

营销页面基于文件组织：`src/pages/` 对应英语，`src/pages/fr/` 对应法语，各自渲染 `src/views/` 中的共享视图。`LanguagePicker` 组件在两者之间切换。所有与语言相关的逻辑都在 [`src/utils/locale.ts`](src/utils/locale.ts) 中（语言列表、`resolveLocale()`、`localePath()`、`alternatePaths()`）；中间件每个请求解析一次语言并暴露为 `Astro.locals.locale`，对应的文案表为 `Astro.locals.copy`。UI 字符串位于 [`src/copy/en.ts`](src/copy/en.ts) 和 [`src/copy/fr.ts`](src/copy/fr.ts)；法语表以英语表为类型约束，缺少翻译会导致 `astro check` 失败。文档的语言在 Starlight 中配置；指南和欢迎页已翻译，其他文档区块回退到英语。

静态构建全站只能有一个 `404.html`（英语）。法语 404 也会构建到 `/fr/404/`；[`vercel.json`](vercel.json) 中的 `rewrites` 条目会把不存在的 `/fr/…` 路径指向它（Vercel 以 200 状态提供重写）。在 Netlify 上改用 `_redirects` 一行：`/fr/* /fr/404/index.html 404`。

### 图标

SVG 图标集中位于 [`src/components/ui/icons/icons.ts`](src/components/ui/icons/icons.ts)（内置 45 个）。渲染方式：

```astro
<Icon name="tools" class="h-6 w-6 text-orange-400" />
```

条目只保存几何数据；尺寸和颜色来自你传入的 `class`（每个图标都用 `text-*` 类着色）。`name` 是有类型的，拼错会导致 `astro check` 失败。在 `icons.ts` 中添加条目即可注册新图标。

---

## 部署

`pnpm build` 会在 `dist/` 中生成静态站点，任何静态托管都能提供服务。

- **Vercel：** [Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmearashadowfax%2FScrewFast)。内置的 [`vercel.json`](vercel.json) 添加了安全响应头和缓存规则。
- **Netlify：** [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/mearashadowfax/ScrewFast)。

---

## 项目结构

```
src/
├── assets/
│   ├── scripts/            # Lenis 平滑滚动、演示表单行为
│   └── styles/             # global.css、lenis.css、Starlight 覆盖样式
├── components/
│   ├── Meta.astro          # 根据 utils/metadata.ts 渲染 <head>
│   ├── ThemeIcon.astro     # 明暗主题切换
│   ├── sections/           # 页面区块：landing、features、pricing、navbar&footer……
│   └── ui/                 # 按钮、卡片、表单、图标、横幅……
├── content/
│   ├── blog/  products/  insights/   # 含 en/ 和 fr/ 子目录
│   └── docs/                          # Starlight 文档 + 各语言翻译
├── copy/                   # en.ts / fr.ts：所有 UI 与页面字符串，带类型
├── data_files/             # constants.ts (SITE/OG)、navigation.ts、mega_link.ts、faqs/features/pricing JSON
├── images/                 # 被 Astro 导入并优化
├── layouts/
│   └── MainLayout.astro    # Navbar + slot + footer、Meta、Lenis、Preline
├── middleware.ts           # 每个请求设置 Astro.locals.locale / .copy
├── pages/                  # 基于文件的路由；fr/ 与之镜像，每个都是一行壳
│   ├── index.astro  blog/  products/  insights/  contact.astro  services.astro
│   ├── 404.astro           # 同时构建到 fr/404/
│   └── robots.txt.ts  manifest.json.ts  favicon.ico.ts
├── views/                  # 每个路由一个视图；locale 作为 prop
├── utils/                  # locale.ts、content.ts、metadata.ts、辅助函数
└── content.config.ts       # 内容集合 Schema

public/                     # 原样提供
process-html.mjs            # 构建后 HTML 压缩
scripts/smoke.mjs           # 启动 dist/ 并检查两种语言下的所有营销路由
vercel.json                 # 安全响应头与缓存
AI_GUIDE.md                 # 给 AI 编程助手的约定说明
```

路径别名（`@components/*`、`@content/*`、`@data/*`、`@images/*`、`@scripts/*`、`@styles/*`、`@utils/*`、`@views/*`、`@/*`）在 [`tsconfig.json`](tsconfig.json) 中定义。

---

## 深入原理

### 平滑滚动（Lenis）

[Lenis](https://lenis.dev/) 通过 `src/assets/scripts/lenisSmoothScroll.js` 在 `MainLayout.astro` 和 `src/components/ui/starlight/Head.astro` 中加载。平滑滚动可能影响某些设备上的无障碍性和性能，请针对你的受众进行测试。

要恢复原生滚动，请从两个文件中删除：

```astro
<script>
  import '@scripts/lenisSmoothScroll.js';
</script>
```

### 动画（GSAP）

[GSAP](https://gsap.com/) 为产品详情页和 insight 详情页提供加载动画。相关配置在 `src/components/sections/products/ProductDetail.astro` 和 `src/components/sections/insights/InsightDetail.astro` 的 `<script>` 块中。可以调整 `gsap.from()` 调用，或删除 script 块以移除 GSAP。

### 隐藏滚动条

为了更简洁的外观，滚动条被隐藏了。这可能影响部分用户的可用性；要恢复它，请从 `MainLayout.astro` 中 `<html>` 上移除 `scrollbar-hide` 类，并删除该文件底部的 `.scrollbar-hide` 样式。如需自定义滚动条样式，[tailwind-scrollbar](https://adoxography.github.io/tailwind-scrollbar/) 是个不错的选择。

### SEO 与结构化数据

页面告诉 `MainLayout` 它"是什么"（`title`、`description`、`section`、`kind`）；[`src/utils/metadata.ts`](src/utils/metadata.ts) 把它转换为完整的 `<head>`：带站点后缀的标题、描述、Open Graph 和 Twitter 标签（`title | section | site`）、canonical、`hreflang` 备用链接，以及填好站点样板信息的 schema.org JSON-LD。语言通过中间件从 URL 得出，因此页面从不传递它，也从不手写 schema.org 对象：

```astro
<MainLayout
  title="Example Page"
  description="What this page is about."
  section="Insights"
  kind={{ type: 'Article', image: post.data.cardImage.src }}
>
  ...
</MainLayout>
```

`kind` 可以是 `WebPage`（默认）、`BlogPosting`、`Article` 或 `Product`。在 `metadata.ts` 中添加新的 kind，或在 [`Meta.astro`](src/components/Meta.astro) 中添加额外标签。

### 表单

联系、订阅和登录/注册/找回密码表单都是用 [`DemoForm.astro`](src/components/ui/forms/DemoForm.astro) 包裹的占位表单，它负责拦截提交、校验、显示对应语言的成功消息并重置。要接入真实后端，请将 `<DemoForm>` 包裹替换为 `<form action=…>`（或你的服务商提供的代码片段）并去掉 `successMessage`；内部输入框是普通 HTML 字段。

### robots.txt 与 sitemap

[`src/pages/robots.txt.ts`](src/pages/robots.txt.ts) 在构建时生成 `robots.txt` 并链接到 `@astrojs/sitemap` 生成的 sitemap。两者的域名都来自 `astro.config.mjs` 中的 `site`。

### Markdown、MDX 与图片粘贴

已启用 `@astrojs/mdx`，因此内容文件可以是 `.md` 或 `.mdx`。内置的 [`.vscode/settings.json`](.vscode/settings.json) 允许你按住 <kbd>Shift</kbd> 把图片粘贴或拖拽到内容文件中：VS Code 会将其复制到 `src/images/content/<file-name>/` 并插入 Markdown 链接。

### HTML 压缩

`pnpm build` 最后会运行 [`process-html.mjs`](process-html.mjs)，用 `html-minifier-terser` 压缩构建输出中的每个 HTML 文件。

### 安全响应头

[`vercel.json`](vercel.json) 设置了 `Content-Security-Policy`、`X-Frame-Options`、`X-Content-Type-Options`、`Referrer-Policy`、`Permissions-Policy` 和缓存响应头。如果添加第三方脚本或图片托管，请相应调整 CSP。

### 代码格式化

Prettier 配置了 `prettier-plugin-astro` 和 `prettier-plugin-tailwindcss`（类名排序），配置文件为 [`.prettierrc`](.prettierrc)。本地运行 `pnpm format:fix`；CI 运行 `pnpm format:check`。

---

## 参与贡献

- **Bug 和想法：** 提交 [issue](https://github.com/mearashadowfax/ScrewFast/issues) 或发起 [discussion](https://github.com/mearashadowfax/ScrewFast/discussions/new/choose)。
- **Pull request：** 欢迎。提交前请运行 `pnpm format:fix` 和 `pnpm build`。

参见 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)（[中文版](CODE_OF_CONDUCT.zh-CN.md)）。

## 许可证

MIT。参见 [LICENSE](LICENSE)。

站点中展示的公司、产品和 logo 均为虚构或仅用于演示，请在你的站点中替换。