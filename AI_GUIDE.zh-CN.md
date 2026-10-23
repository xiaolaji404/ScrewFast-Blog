# ScrewFast AI 指南

[English](AI_GUIDE.md) | 简体中文

面向 AI 助手（Cursor、Copilot、Claude、ChatGPT）：本文件描述项目结构、约定，以及在哪里查找或添加代码。人类读者的安装与功能说明见 [README.md](README.md)（[中文版](README.zh-CN.md)），主要模块的名称见 [CONTEXT.md](CONTEXT.md)。

## 项目概览

ScrewFast 是一个 Astro + Tailwind CSS + Preline UI 模板，适用于落地页、博客、文档和产品/内容页面。技术栈：Astro 7、Tailwind v4（通过 `@tailwindcss/vite`）、Preline（模态框、手风琴）、Starlight（文档）、Lenis（平滑滚动）、GSAP（动画）。

营销站点语言：**en** 和 **fr**。路由位于 `src/pages/` 和 `src/pages/fr/`，但每个路由文件只是"一行壳"，包裹 `src/views/` 中接收 locale 作为 prop 的共享视图。所有与语言相关的逻辑都在 [`src/utils/locale.ts`](src/utils/locale.ts) 中；当前语言及其文案表位于 `Astro.locals.locale` / `Astro.locals.copy`（由 [`src/middleware.ts`](src/middleware.ts) 设置）。永远不要从路径名中解析 `/fr`，也不要在其他地方硬编码语言前缀。

文档（Starlight）语言：en、de、es、fa、fr、ja、zh-cn。指南和欢迎页已翻译；`construction/`、`tools/` 和 `advanced/` 在非根语言下回退到英语。

## 路径别名

使用这些导入，以保持路径正确且一致：

| 别名            | 解析到                 |
| --------------- | ---------------------- |
| `@/*`           | `src/*`                |
| `@components/*` | `src/components/*`     |
| `@content/*`    | `src/content/*`        |
| `@data/*`       | `src/data_files/*`     |
| `@images/*`     | `src/images/*`         |
| `@scripts/*`    | `src/assets/scripts/*` |
| `@styles/*`     | `src/assets/styles/*`  |
| `@utils/*`      | `src/utils/*`          |
| `@views/*`      | `src/views/*`          |

示例：`import { SITE } from "@data/constants";` —— 不要写成 `@/data_files/constants`。

定义见 [tsconfig.json](tsconfig.json)。

## 关键文件夹

| 用途                    | 路径                               | 说明                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 可复用 UI 与区块        | [src/components/](src/components/) | `sections/` 用于 landing、features、navbar&footer、testimonials、pricing、misc；`ui/` 用于 buttons、cards、forms、icons 等。                                                                                                                                                                                                                                                                   |
| 布局                    | [src/layouts/](src/layouts/)       | [MainLayout.astro](src/layouts/MainLayout.astro) 包裹 Navbar、main slot、FooterSection，并根据 `title`/`description`/`ogTitle`/`kind` 构建整个 `<head>`。                                                                                                                                                                                                                                     |
| 视图                    | [src/views/](src/views/)           | 每个路由一个 `.astro`（`HomeView`、`ServicesView`、`BlogPostView` 等）。接口：`locale`（或一个内容条目，其语言即条目自身语言）。所有页面文案来自 `src/copy/`。                                                                                                                                                                                                                                  |
| 页面                    | [src/pages/](src/pages/)           | Astro 基于文件的路由；`fr/` 与之镜像。每个文件为自身语言渲染视图；`[id]` 路由通过 `@utils/content` 的 `staticPathsFor()` 生成 `getStaticPaths`。                                                                                                                                                                                                                                              |
| 文案表                  | [src/copy/](src/copy/)             | `en.ts` 定义结构（`Copy`）；`fr.ts` 必须与之匹配，否则 `astro check` 失败。所有 UI 和页面字符串都在这里。通过 `Astro.locals.copy` 或 `getCopy(locale)` 读取。                                                                                                                                                                                                                                   |
| 内容（集合）            | [src/content/](src/content/)       | `blog/`、`products/`、`insights/`（含 `en/` 和 `fr/` 子目录）；`docs/` 用于 Starlight。使用 [`src/utils/content.ts`](src/utils/content.ts) 中的 `entriesFor()`、`pathFor()`、`localeOf()`，切勿解析 `entry.id`。                                                                                                                                                                             |
| 静态资源                | [public/](public/)                 | 按原样提供服务。                                                                                                                                                                                                                                                                                                                                                                               |
| 工具函数                | [src/utils/](src/utils/)           | [locale.ts](src/utils/locale.ts)（语言、`resolveLocale`、`localePath`、`alternatePaths`）、[content.ts](src/utils/content.ts)、[metadata.ts](src/utils/metadata.ts)（`buildPageMetadata`）、[utils.ts](src/utils/utils.ts)。                                                                                                                                                                    |
| 站点配置与 JSON 数据    | [src/data_files/](src/data_files/) | [constants.ts](src/data_files/constants.ts)：SITE、OG 图片、partnersData；[navigation.ts](src/data_files/navigation.ts)（导航/页脚 id + 路径、社交 URL）和 [mega_link.ts](src/data_files/mega_link.ts)（mega menu id/图标/URL）—— 它们的标签在 `copy.nav` 中；faqs.json、features.json、pricing.json 及 `fr/` 对应文件（通过 `copy.data` 暴露）。                                          |
| 样式与脚本              | [src/assets/](src/assets/)         | `styles/`（global.css、lenis.css、starlight）；`scripts/` 例如 [lenisSmoothScroll.js](src/assets/scripts/lenisSmoothScroll.js)、[demoForms.ts](src/assets/scripts/demoForms.ts)。                                                                                                                                                                                                               |
| 图片（导入）            | [src/images/](src/images/)         | 通过 `@images/` 使用；由 Astro 处理。                                                                                                                                                                                                                                                                                                                                                          |

## 布局与主要组件

- **MainLayout**（[MainLayout.astro](src/layouts/MainLayout.astro)）：Props 为 `title?`（不含站点后缀）、`description?`、`ogTitle?`、`section?`（OG 标题变为 `title | section | site`）、`kind?`（`WebPage` | `BlogPosting` | `Article` | `Product`）、`hideFooter?`。将它们传给 `buildPageMetadata()`，由其生成标题、描述、OG/Twitter、canonical、hreflang 和 JSON-LD；[Meta.astro](src/components/Meta.astro) 渲染这些内容以及 favicon/manifest。页面从不手写 schema.org 对象。
- **首页**（[HomeView.astro](src/views/HomeView.astro)）：组合 AnnouncementBanner、HeroSection、ClientsSection、FeaturesGeneral、FeaturesNavs、TestimonialsSection、PricingSection、FAQ；文案来自 `getCopy(locale).home`，JSON 数据来自 `copy.data`。
- **图标**（[Icon.astro](src/components/ui/icons/Icon.astro)）：`<Icon name="…" class="…" />`。`name` 是有类型的（`IconName`）；[icons.ts](src/components/ui/icons/icons.ts) 只保存几何数据，因此尺寸/颜色/状态类由调用方传入（用 `text-*` 着色）。
- **404**：`NotFoundView` 构建到 `/404`（en）和 `/fr/404/`（fr）；`vercel.json` 把不存在的 `/fr/…` 路径重写到法语版本。
- **导航栏**：`MainLayout` 使用 `Navbar.astro`；`NavbarMegaMenu.astro`（Services 链接上的 mega menu，链接在 `@data/mega_link`）是替代方案——在 MainLayout 中替换 import 即可使用。像这样（暂时）没有被引用的可选模块是模板特性，不要当作死代码删除它们。
- **演示表单**（[DemoForm.astro](src/components/ui/forms/DemoForm.astro)）：将占位表单包裹在 `<DemoForm successMessage={…}>` 中；它负责提交拦截和状态元素。不要手动输出 `data-demo-*` 属性。

## 约定

- **语言：** `Astro.locals.locale` / `Astro.locals.copy`（由中间件从 URL 设置）是唯一来源；MainLayout、Navbar、Footer 以及每个叶子组件都读取它们。视图接收 `locale` 作为 prop 只是为了让路由壳显式；它始终等于 `Astro.locals.locale`。用 `localePath(locale, '/products')` 构建链接。
- **文案：** 组件或视图中不放面向用户的字符串；向 `src/copy/en.ts` 和 `src/copy/fr.ts` 添加 key。结构（路径、id、URL）在 `src/data_files/`，标签在以 id 为键的文案中；逻辑依据 key 而非翻译后的标签（例如 `badge: 'hiring'`）。
- **内容 URL：** 使用 `@utils/content` 的 `pathFor(entry)`；卡片只接收一个条目，别无其他。
- **样式：** 只用 Tailwind CSS；使用 **Tailwind v4** 语法（参考 Tailwind v4 文档）。
- **交互式 UI：** 模态框、下拉、手风琴使用 Preline（脚本在 MainLayout 中加载）。
- **平滑滚动：** 通过 [lenisSmoothScroll.js](src/assets/scripts/lenisSmoothScroll.js) 使用 Lenis。
- **内容集合：** Schema 在 [content.config.ts](src/content.config.ts)（blog、products、insights、docs）。

## 开发命令

- `pnpm dev` —— 运行开发服务器
- `pnpm build` —— 类型检查（`astro check`）、构建，然后 HTML 处理（[process-html.mjs](process-html.mjs)）
- `pnpm preview` —— 预览生产构建
- `pnpm test:smoke` —— 启动 `dist/` 并检查两种语言下的所有营销路由（[scripts/smoke.mjs](scripts/smoke.mjs)）

## 给 AI 的建议

- 在建议的代码中使用**路径别名**（`@components`、`@data`、`@images`、`@views` 等）。
- 要修改页面，编辑 [src/views/](src/views/) 中的视图和 [src/copy/](src/copy/) 中的字符串；不要把页面复制一份到 `src/pages/fr/`。
- 添加语言：扩展 `locale.ts` 中的 `MARKETING_LOCALES` 和 `LOCALE_INFO`，添加 `src/copy/<locale>.ts`，添加 `src/pages/<locale>/` 路由壳，添加 `src/content/*/<locale>/` 内容。
- 将新的可复用组件放在 [src/components/](src/components/) 下（按用途选择 `sections/` 或 `ui/`）。
- 在 [src/content/](src/content/) 中添加或编辑内容，并遵守 [content.config.ts](src/content.config.ts) 的 schema。
- 只使用 **Tailwind v4**；不要使用 Tailwind v3 语法。