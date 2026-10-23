# ScrewFast 领域术语表

[English](CONTEXT.md) | 简体中文

本代码库围绕以下概念构建。在代码、文档和评审中请使用这些术语。

> 英文术语是代码与文档中实际使用的名称（如 `Marketing Locale`、`Copy Table`），此处保留原文并附中文解释，方便对照。

## Marketing site（营销站点）

`src/pages/` 下的 Astro 页面（landing、services、contact、blog、products、insights）以及 `src/pages/fr/` 下的法语孪生页面。与 **Docs**（文档）不同，文档是 `src/content/docs/` 下的 Starlight 页面，有自己独立的语言处理。

## Marketing Locale（营销语言）

营销站点发布所用的语言之一：`en`（默认，URL 无前缀）或 `fr`（`/fr/…`）。由 `src/utils/locale.ts` 统一管理——它是唯一知道语言列表、如何从请求解析语言、如何本地化路径、如何找到同一页面其他语言版本的地方。按请求暴露为 `Astro.locals.locale`。

## Copy Table（文案表）

某一种 Marketing Locale 的全部面向用户字符串的类型化表（`src/copy/en.ts`、`src/copy/fr.ts`）。英语表定义结构（`Copy`）；其他语言必须满足它，因此缺少翻译会变成类型错误。按请求暴露为 `Astro.locals.copy`。逻辑依据表中稳定的 id（例如 `badge: 'hiring'`），绝不依据翻译后的文字。

## View（视图）

一个路由在任意语言下的实现（`src/views/*View.astro`）。它的接口是 locale（或一个 Content Entry，其语言即条目自身语言）。`src/pages/` 和 `src/pages/fr/` 中的路由文件只是"一行壳"，为各自的语言渲染视图。

## Content Entry（内容条目）

某个本地化集合（`blog`、`insights`、`products`）中的一篇 Markdown/MDX 文档，存放于 `src/content/<collection>/<locale>/<slug>.md`。`src/utils/content.ts` 负责"条目 id 是 `<locale>/<slug>`"这条规则、每个集合的服务路由以及各自的默认排序；调用方通过它获取条目的语言、slug、路径和同组条目。

## Page Metadata（页面元数据）

页面 `<head>` 所需的一切（标题、描述、Open Graph、canonical、hreflang 备用链接、schema.org JSON-LD），由 `src/utils/metadata.ts` 从页面关于自身的五个已知量推导而来：locale、路径、标题、描述和 **Page Kind**（`WebPage`、`BlogPosting`、`Article`、`Product`）。由 `Meta.astro` 渲染。

## Demo Form（演示表单）

模板中的占位表单（联系、订阅、登录/注册/找回密码），未接入后端。`DemoForm.astro` 负责其行为：拦截提交、校验、显示对应语言的成功消息并重置。

## Icon（图标）

`src/components/ui/icons/icons.ts` 中的命名 SVG 图形，只保存几何数据。尺寸、颜色（通过 `text-*` 类）和状态类由调用处决定。名称是有类型的（`IconName`）。