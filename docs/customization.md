# 改造指南：把 ScrewFast 变成你自己的博客

> 面向对象：想以本模板为起点搭建个人博客的人。
>
> 读完后你可以独立完成：**换品牌 → 改文案 → 写文章 → 删掉不需要的模块 → 只留一种语言 → 部署上线**。
>
> 配套文档：[开发与维护帮助文档](./development.md)；原模板说明见根目录 `README.md`。

## 目录

- [0. 先跑起来](#0-先跑起来)
- [1. 改造地图：想改 X，就去 Y](#1-改造地图想改-x就去-y)
- [2. 第一步：站点身份](#2-第一步站点身份)
- [3. 第二步：品牌视觉](#3-第二步品牌视觉)
- [4. 第三步：页面文案（copy 表）](#4-第三步页面文案copy-表)
- [5. 第四步：结构化数据（JSON）](#5-第四步结构化数据json)
- [6. 第五步：导航、页脚与社交链接](#6-第五步导航页脚与社交链接)
- [7. 第六步：写你的博客文章](#7-第六步写你的博客文章)
- [8. 第七步：删掉不需要的模块（做纯博客）](#8-第七步删掉不需要的模块做纯博客)
- [9. 第八步：只留一种语言](#9-第八步只留一种语言可选)
- [10. 第九步：构建、部署与上线检查](#10-第九步构建部署与上线检查)
- [常见问题 FAQ](#常见问题-faq)

---

## 0. 先跑起来

环境要求：**Node.js 22** + **pnpm 9**（与 CI 一致）。

```bash
pnpm install     # 安装依赖
pnpm dev         # 开发服务器 → http://localhost:4321
```

修改任意文件会热更新。上线前用 `pnpm build` + `pnpm test:smoke` 验证。

开始改造前，先记住两个概念（后面反复用到）：

1. **文案表（copy table）**：全站文字集中在 `src/copy/en.ts`、`src/copy/fr.ts`，组件里不写死文字。**改文字 = 改表**。
2. **视图（view）**：页面的实现在 `src/views/`；`src/pages/` 里只是"一行壳"负责 URL 路由。**改页面 = 改视图**。

---

## 1. 改造地图：想改 X，就去 Y

| 你想改的东西 | 去哪里改 |
| --- | --- |
| 站名、域名、作者、SEO 默认描述 | `src/data_files/constants.ts` 的 `SITE`；域名还要改 `astro.config.mjs` 的 `site` |
| Logo | `src/components/BrandLogo.astro`（内联 SVG） |
| favicon / 桌面图标 | `src/images/icon.png`、`icon.svg`、`icon-maskable.png` |
| 社交分享大图（OG 图） | `src/images/social.png` |
| 页面配图 | `src/images/*.avif`（引用位置在各视图，如 `src/views/HomeView.astro`） |
| 页面文字（导航、按钮、标题……） | `src/copy/en.ts` 和 `src/copy/fr.ts` |
| FAQ / 功能列表 / 价格数据 | `src/data_files/faqs.json`、`features.json`、`pricing.json`（及 `fr/` 下同名文件） |
| 顶部导航、页脚链接、社交账号 | `src/data_files/navigation.ts` + copy 表的 `nav` 块 |
| 博客文章 | `src/content/blog/en/*.md` |
| 客户 logo 墙 | `src/data_files/constants.ts` 的 `partnersData` |
| 安全响应头、404 重写 | `vercel.json` |

---

## 2. 第一步：站点身份

### 2.1 `src/data_files/constants.ts`

```ts
export const SITE = {
  title: '我的博客',             // 出现在 <title> 后缀、og:site_name
  tagline: '一句话定位',          // 预留给扩展，目前未被使用
  description: '……',            // 页面未单独设置时的默认 meta description（建议 ≤160 字）
  description_short: '……',      // 结构化数据（JSON-LD）里的网站简介
  url: 'https://你的域名.com',   // 关键：canonical / hreflang / JSON-LD 都基于它
  author: '你的名字',
};
```

### 2.2 `astro.config.mjs`

- `site: 'https://你的域名.com'` —— sitemap 和 `robots.txt` 的地址基于它。**必须和上面的 `SITE.url` 一致**：前者管 sitemap/robots，后者管页面 `<head>`，两边都要改。
- `image.domains: ['images.unsplash.com']` —— 只有你还在使用 Unsplash 远程图片时才需要保留（首页头像、评价头像等用的就是它）。
- `starlight` 配置块：
  - `title: 'ScrewFast Docs'` → 你的文档站名（不需要文档站可整体删除，见第 8 步）。
  - `head` 里两处 `'https://screwfast.uk' + '/social.webp'` → 换成你的域名；并确认 `public/social.webp` 存在。
    **注意：当前仓库的 `public/` 里只有 `banner-pattern.svg`，这两条是模板遗留引用**——要么补文件，要么改成已有图片，要么删掉这两条配置。
  - `social` 里的 GitHub 链接 → 你的仓库地址。

### 2.3 全仓库搜索残留

```bash
grep -ri "screwfast" src/
```

会命中的地方（替换成你的品牌）：

- `src/copy/en.ts` / `fr.ts` —— 文案里的品牌名（最多）
- `src/data_files/constants.ts` —— `SITE`、`partnersData` 的注释
- `astro.config.mjs` —— Starlight 标题、GitHub 链接
- `src/data_files/navigation.ts` —— `socialLinks.github`
- 演示文章正文 —— 建议直接删掉重写
- `src/components/BrandLogo.astro` —— logo SVG 里刻着字母形状（见下一步）

---

## 3. 第二步：品牌视觉

### 3.1 小图标（favicon / 桌面图标）

| 文件 | 用途 | 建议尺寸 |
| --- | --- | --- |
| `src/images/icon.png` | 构建时自动生成 `/favicon.ico`（16/32px）和 Apple Touch Icon（180px） | ≥ 512×512 方形 PNG |
| `src/images/icon.svg` | 浏览器标签页的 SVG 图标 | 矢量 |
| `src/images/icon-maskable.png` | PWA manifest 里的 maskable 图标 | 512×512（四周留安全边距） |

替换同名文件即可，**不需要改代码**。

### 3.2 社交分享图（OG Image）

`src/images/social.png` —— 分享链接到微信/微博/Twitter 等平台时展示的大图，构建时会裁成 1200×600。建议做成 1200×630，图片上包含你的博客名。

### 3.3 Logo

`src/components/BrandLogo.astro` 是一个内联 SVG（图形 + "FAST" 字母路径写死在里面）。最省事的做法：

- **把整个 `<svg>…</svg>` 换成你自己的 SVG**；或
- 改成 `<img src="/your-logo.svg" …>`（图片放 `public/` 或 `src/images/` 均可）。

### 3.4 页面配图

首页与内页的插画/照片都在 `src/images/`（`hero-image.avif`、`features-image.avif`、`dashboard-image.avif` 等），**替换同名文件即可生效**。两个注意点：

1. 如果换成 `.png` / `.jpg`，要同步修改引用处的后缀，例如 `src/views/HomeView.astro` 里的 `import heroImage from '@images/hero-image.avif'`。
2. 模板里还有若干 Unsplash 远程图片（首页头像、评价头像、mega menu 人物图）。要么保留（依赖 `astro.config.mjs` 的 `image.domains` 和 CSP 白名单），要么换成本地图片（记得同时清理 CSP，见第 10 步）。

### 3.5 博客图片

在 `src/images/blog/`：文章封面 `post-*.avif`、作者头像 `jacob.avif` / `anna.avif` / `brad.avif`。换成你自己的即可，文件名随意，frontmatter 里对号引用。

---

## 4. 第三步：页面文案（copy 表）

### 4.1 规则

- `src/copy/en.ts` 定义**结构**（TypeScript 类型 `Copy`）；`src/copy/fr.ts` 必须有相同的 key。少一个 key，`pnpm build`（astro check）就会报错——这是防漏翻的保护，不是 bug。
- 标题类字段可以内嵌 HTML 做彩色强调：

```ts
title: '用 <span class="text-yellow-500 dark:text-yellow-400">我的博客</span> 记录成长',
```

### 4.2 copy 表的 17 个块

| 块 | 管什么 |
| --- | --- |
| `site` | 默认 SEO 描述、OG 标题/描述 |
| `layout` | "跳到内容"、切换主题/语言等框架按钮无障碍文字 |
| `nav` | 导航标签、页脚（含订阅框文案）、mega menu |
| `forms` / `auth` | 表单占位符、校验提示、登录/注册文案 |
| `share` / `banner` | 分享按钮、顶部公告条 |
| `blog` / `insights` / `products` | 各自详情页用词（阅读时间、相关文章、OG section 等） |
| `notFound` | 404 页文案 |
| `home` / `services` / `contact` / `blogIndex` / `productsIndex` | 各页面完整文案 |
| `data` | 把 `data_files/*.json` 挂到文案表上（见第 5 步） |

### 4.3 高频修改点

| 想改 | 对应 key |
| --- | --- |
| 首页大标题 | `home.hero.title` |
| 首页两个按钮 | `home.hero.primaryBtn` / `home.hero.secondaryBtn` |
| 首页 FAQ 标题 | `home.faqTitle` |
| 博客列表标题/描述 | `blogIndex.heading` / `blogIndex.subTitle` / `blogIndex.metaDescription` |
| 页脚订阅文案 | `nav.footer.stayUpToDate` / `nav.footer.stayUpToDateContent` |
| 404 页文案 | `notFound.*` |

---

## 5. 第四步：结构化数据（JSON）

`src/data_files/` 下的 JSON 是"可枚举内容"（FAQ 列表、功能点、价格档位）：

- `faqs.json`、`features.json`、`pricing.json`（英文）
- `fr/faqs.json` 等（法文，结构必须一致）

它们通过 copy 表末尾的 `data: { faqs, features, pricing }` 暴露给页面（`HomeView` 里用 `t.data.features`、`t.data.pricing`、`t.data.faqs` 消费）。**改数据不需要动 schema**——照着 JSON 里已有条目的字段改即可。

客户 logo 墙在 `constants.ts` 的 `partnersData`（内嵌 SVG 字符串，`href` 指向客户网站）。

---

## 6. 第五步：导航、页脚与社交链接

`src/data_files/navigation.ts` 是"结构表"：**只有 id + 路径，没有文字**。

```ts
export const navLinks = [
  { id: 'home', path: '/' },
  { id: 'products', path: '/products' },
  // ...
];
```

文字在 copy 表里**按 id 对应**：`nav.labels.home → '首页'`。

- **加一个导航项**：`navigation.ts` 加 `{ id: 'about', path: '/about' }` → `copy.nav.labels` 加 `about` 标签（en/fr 都加）→ 创建 `/about` 页面（见开发文档的 HOW-TO）。
- **改页脚**：`footerSections`（结构）+ `copy.nav.footer.sectionTitles / links`（文字）。`badge: 'hiring'` 这类徽标用 id 控制显示，文字在 `nav.footer.hiringBadge`。
- **社交链接**：`socialLinks` 换成你自己的主页，页脚会自动读取。
- **Mega menu**（可选）：默认导航用 `Navbar.astro`；想在 "Services" 上加巨型菜单，改 `MainLayout.astro` 里的 import 改用 `NavbarMegaMenu.astro`，并把 `src/data_files/mega_link.ts` 的链接换成实际地址。

---

## 7. 第六步：写你的博客文章

### 7.1 建文件

```
src/content/blog/en/我的第一篇文章.md   → 地址 /blog/<文件名>/
src/content/blog/fr/xxx.md             → 地址 /fr/blog/<文件名>/
```

- **文件名就是 URL（slug）**。建议用英文/拼音，避免中文 URL 编码问题。
- 以 `_` 开头的文件会被忽略（模板规则 `**/[^_]*.{md,mdx}`），适合放草稿。
- `.md` 和 `.mdx` 都支持。

### 7.2 frontmatter 字段（由 `src/content.config.ts` 定义）

```md
---
title: '文章标题（会拼进 <title> 和 JSON-LD）'
description: '一句话摘要，用于列表卡片和 SEO'
author: '你的名字'
role: '前端工程师'                     # 可选
authorImage: '@/images/blog/me.avif'   # 头像（建议 ≥200×200）
authorImageAlt: '我的头像'
pubDate: 2026-10-23                    # 列表按它倒序排列
cardImage: '@/images/blog/post-1.avif' # 列表卡片封面
cardImageAlt: '封面描述'
readTime: 5                            # 阅读时长（分钟，手动填）
tags: ['随笔']                          # 可选
---

正文从空一行之后开始。
```

### 7.3 正文插图

- 把图片放在文章旁边，用**相对路径**引用（如 `./diagram.png`）——Astro 会自动优化。
- frontmatter 的图沿用模板写法 `@/images/blog/xxx.avif`（`@images/*` 是 tsconfig 里定义的路径别名）。

### 7.4 文章页自动得到的功能

发布后自动拥有：社交分享按钮、浏览器本地书签（localStorage）、反馈小组件（纯前端演示）、相关文章列表（当前实现 = 同语言的其他文章）。**无需配置**。

### 7.5 其它内容类型（可选）

- `insights`：另一种文章类型（带目录 + 滚动进度条），字段只有 `title / description / cardImage / cardImageAlt`。
- `products`：产品详情页（规格表、蓝图、选项卡等复杂字段），纯博客可删（见下一步）。
- `docs`：`/welcome-to-docs/` 的 Starlight 文档站，内容在 `src/content/docs/`。

---

## 8. 第七步：删掉不需要的模块（做纯博客）

假设只保留：首页 + 博客 + 联系页（+ 可选文档站），删除 products / services / insights。

**从"被引用的地方"倒着删：**

1. **首页去掉相关区块**：`src/views/HomeView.astro` 删掉对应 section 的 import 和使用（`PricingSection`、`TestimonialsSection`、`FeaturesNavs` 等按需保留）。
2. **删视图**：`src/views/ProductView.astro`、`ProductsIndexView.astro`、`ServicesView.astro`、`InsightView.astro`。
3. **删路由**（含 `fr/`）：`src/pages/products/`、`src/pages/services.astro`、`src/pages/insights/` 及 `src/pages/fr/` 下对应目录。
4. **删内容**：`src/content/products/`、`src/content/insights/`。
5. **删集合定义**：`src/content.config.ts` 里删掉对应 `defineCollection` 和 `collections` 导出项。
6. **删文案**：`src/copy/en.ts` 和 `fr.ts` 里删掉 `products` / `productsIndex` / `services` / `insights` 块。**两个语言必须同步删**，否则类型检查报错。
7. **删导航/页脚链接**：`src/data_files/navigation.ts` 的 `navLinks` / `footerSections`。
8. **同步冒烟测试**：`scripts/smoke.mjs` 里删掉 `MARKETING_ROUTES` 中已删除的路由（如 `/products/`、`/insights/insight-1/`），否则 `pnpm test:smoke` 会失败。
9. **验证**：

```bash
pnpm build && pnpm test:smoke
```

> 顺序原则：**先删引用（视图/页面），再删定义（collection/文案）**。删一半就去 build，报错会直接告诉你哪里还引用着被删的东西——跟着报错清理即可。

---

## 9. 第八步：只留一种语言（可选）

如果你只写一种语言，两种做法：

### 方案 A：保留 i18n 机制，只留英文（即"删掉 fr"）

1. `src/utils/locale.ts`：`MARKETING_LOCALES = ['en']`；`LOCALE_INFO` 删除 `fr` 条目。
2. 删除 `src/copy/fr.ts`，并移除 `src/copy/index.ts` 里对它的引用。
3. 删除 `src/pages/fr/` 整个目录。
4. 删除 `src/content/blog/fr/`、`src/content/insights/fr/`、`src/content/products/fr/`。
5. `astro.config.mjs`：sitemap 的 `i18n.locales` 只留 `en`（或直接把 `sitemap({...})` 简化成 `sitemap()`）；Starlight 的 `locales` 按需精简。
6. `vercel.json`：删除 `/fr/:path*` 的 rewrite。
7. `scripts/smoke.mjs`：`LOCALE_PREFIXES` 改为 `['']`。

> 只写中文的最省事做法：用方案 A 删掉 fr，然后直接把 `src/copy/en.ts` 的文案全部改写成中文、文章放 `src/content/blog/en/` 即可。**语言标识（en/fr）只是目录名和 URL 前缀，不强制内容语言**——URL 不带前缀，对个人博客完全够用。

### 方案 B：把 fr 换成另一种语言（如 zh）

保留 i18n 机制、把第二语言替换掉：全仓库把 `fr` 一致地重命名为 `zh`（或 `zh-cn`）并同步修改所有映射：

- `src/utils/locale.ts`：`MARKETING_LOCALES`、`LOCALE_INFO`（注意 `lang`、`ogLocale`、`inLanguage`、`intl` 四个字段都要对应）
- `src/copy/fr.ts` → `zh.ts`（内容翻译）+ `copy/index.ts` 注册
- `src/pages/fr/` → `src/pages/zh/`（每个壳里的 `locale="fr"` 改成 `"zh"`）
- `src/content/*/fr/` → `zh/`
- `astro.config.mjs`：sitemap 的 locales、Starlight 的 locales
- `vercel.json`：rewrite 路径
- `scripts/smoke.mjs`：`LOCALE_PREFIXES`

### 方案 C：用上游的单语言分支

上游模板提供 `monolingual-site` 分支（已删除法文与 i18n 管道），想从零做改造可以直接以它为基础。

> 提醒：如果保留 fr 目录却不维护，语言切换按钮会把访客带到空缺/英文页面——**要么删干净，要么认真维护两份**。

---

## 10. 第九步：构建、部署与上线检查

### 10.1 本地验证

```bash
pnpm build        # astro check（类型+文案一致性） + 构建 + HTML 压缩
pnpm preview      # 本地预览构建产物
pnpm test:smoke   # 冒烟测试：起静态服务器，逐个检查关键路由 + 内容断言
```

### 10.2 部署到 Vercel（默认路径）

- 导入仓库即可，构建命令用默认 `pnpm build`，输出目录 `dist/`。
- `vercel.json` 已配好安全响应头 + 法语 404 重写，改域名后确认这两处仍符合需要：
  - **CSP 的 `img-src` 白名单**里有 `https://images.unsplash.com`——如果不再用 Unsplash 图，可以收紧（同时改 `astro.config.mjs` 的 `image.domains`）；如果新增了外部图床/字体/统计脚本，**必须同步加白名单**，否则会被 CSP 拦掉。
  - **`rewrites`**：`/fr/*` → `/fr/404`。静态站只有一个英文 `404.html`，法语 404 靠重写实现（Vercel 重写返回 200 状态）。
  - `Cache-Control: max-age=0, must-revalidate`：`/_astro/*` 下的资源已带内容指纹，可按需调优。

### 10.3 部署到其它平台

- **Netlify**：把法语 404 重写换成 `_redirects` 一行：`/fr/* /fr/404/index.html 404`。
- **任意静态托管**（GitHub Pages / Cloudflare Pages / 对象存储）：`pnpm build` 后上传 `dist/`。若部署在子路径（如 `user.github.io/blog/`），需要额外配置 `base`，本模板默认按根路径设计。
- 纯静态站点：没有后端、没有环境变量。

### 10.4 上线前检查清单

- [ ] `SITE`（`constants.ts`）和 `site`（`astro.config.mjs`）都是你的域名
- [ ] `icon.png` / `icon.svg` / `icon-maskable.png` / `social.png` 已替换
- [ ] `grep -ri "screwfast" src/` 无残留（文案、标题、GitHub 链接）
- [ ] `socialLinks` 指向真实主页
- [ ] 演示文章/产品已删除或重写
- [ ] `pnpm build` 和 `pnpm test:smoke` 全绿
- [ ] 线上 `/sitemap-index.xml` 和 `/robots.txt` 的域名正确
- [ ] 分享一篇文章链接，确认 OG 图显示正常
- [ ] 首页顶部公告条（`AnnouncementBanner`）和底部区块（`HeroSectionAlt`）的模板推广链接已删除/替换

---

## 常见问题 FAQ

**改了文案但页面没变？**
确认改的是页面实际使用的那份表（`en.ts` 还是 `fr.ts`），以及 dev server 是否已热更新；fr 页面读 `fr.ts`，其余读 `en.ts`。

**build 报 `Property 'xxx' is missing`？**
`fr.ts` 与 `en.ts` 不同步。**加/删 key 必须两个文件都改**。

**想换主题色？**
颜色定义在 `src/assets/styles/global.css` 的 `@theme` 块（Tailwind v4 用 CSS 配置，没有 `tailwind.config.js`）。主色是 `yellow-*`，全局搜索 `yellow-` 即可定位使用处。

**想换字体？**
同样在 `global.css` 的 `@theme` 中新增 `--font-*` 变量，再用 `font-*` 类使用（Tailwind v4 语法，参考 Tailwind v4 文档）。

**想加一个页面（比如"关于"）？**
见[开发文档的 HOW-TO](./development.md#12-常见任务how-to)：页面 = 1 个视图 + 2 个路由壳 + copy 表文案。

**图片可以直接用 jpg/png 吗？**
可以，但**改了扩展名要同步改引用处的 import 后缀**（模板默认用 `.avif` 以减小体积）。