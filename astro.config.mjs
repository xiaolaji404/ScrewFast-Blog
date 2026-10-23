import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

/**
 * ── Astro 全局配置 ────────────────────────────────────────────
 * 这个文件决定“站点如何构建”，不决定“页面长什么样”。
 * 改动这里会影响整站构建，改前建议先弄明白每一项的作用。
 * ────────────────────────────────────────────────────────────
 */
// https://astro.build/config
export default defineConfig({
  // 站点绝对地址：sitemap、robots.txt、canonical 链接都基于它。
  // ⚠️ 必须与 src/data_files/constants.ts 的 SITE.url 一致（两处都要改）。
  site: 'https://xiaolaji.site',
  // 允许从 Unsplash 加载远程图片（首页头像等仍在用）；
  // 若以后全部换成自己的图片，可连同 vercel.json 的 CSP 一起收紧。
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  image: {
    domains: ['images.unsplash.com'],
  },
  // 本站只有中文，默认语言不带 URL 前缀，语言处理由 src/utils/locale.ts 自行实现。
  prefetch: true, // 鼠标悬停链接时预加载目标页（搭配卡片上的 data-astro-prefetch）
  integrations: [
    sitemap(), // 构建时生成 sitemap-index.xml（域名来自上面的 site）
    // Starlight：/welcome-to-docs/ 下的文档站（自带搜索、暗色模式、侧边栏）
    starlight({
      title: '星陨的博客 · 文档',
      // 文档站的多语言：这些代码只影响文档站，与 MARKETING_LOCALES 无关。
      // 注意：这里配了 locales，Astro 全局 i18n 就不能再配（同时配会报错）。
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        de: { label: 'Deutsch', lang: 'de' },
        es: { label: 'Español', lang: 'es' },
        fa: { label: 'Persian', lang: 'fa', dir: 'rtl' },
        fr: { label: 'Français', lang: 'fr' },
        ja: { label: '日本語', lang: 'ja' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: 'Quick Start Guides',
          translations: {
            de: 'Schnellstartanleitungen',
            es: 'Guías de Inicio Rápido',
            fa: 'راهنمای شروع سریع',
            fr: 'Guides de Démarrage Rapide',
            ja: 'クイックスタートガイド',
            'zh-cn': '快速入门指南',
          },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Tools & Equipment',
          // Translated guide intros exist per locale; these pages fall back to English.
          translations: {
            de: 'Werkzeuge & Ausrüstung',
            es: 'Herramientas y Equipo',
            fa: 'ابزار و تجهیزات',
            fr: 'Outils et Équipement',
            ja: 'ツールと機材',
            'zh-cn': '工具与设备',
          },
          items: [
            { label: 'Tool Guides', link: 'tools/tool-guides/' },
            { label: 'Equipment Care', link: 'tools/equipment-care/' },
          ],
        },
        {
          label: 'Construction Services',
          translations: {
            de: 'Baudienstleistungen',
            es: 'Servicios de Construcción',
            fa: 'خدمات ساخت‌وساز',
            fr: 'Services de Construction',
            ja: '建設サービス',
            'zh-cn': '施工服务',
          },
          items: [{ autogenerate: { directory: 'construction' } }],
        },
        {
          label: 'Advanced Topics',
          items: [{ autogenerate: { directory: 'advanced' } }],
        },
      ],
      // 关闭 Starlight 自带的 404 路由，全站统一用 src/pages/404.astro
      disable404Route: true,
      customCss: ['./src/assets/styles/starlight.css'],
      favicon: '/favicon.ico',
      // 用自定义组件覆盖 Starlight 内置组件（统一品牌与主题体验）
      components: {
        SiteTitle: './src/components/ui/starlight/SiteTitle.astro', // 左上角站名
        Head: './src/components/ui/starlight/Head.astro', // 文档页额外脚本
        MobileMenuFooter:
          './src/components/ui/starlight/MobileMenuFooter.astro', // 移动端菜单底部
        ThemeSelect: './src/components/ui/starlight/ThemeSelect.astro', // 主题切换按钮
      },
      // 给文档页补充的 <head> 元标签（社交分享图）
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://xiaolaji.site/social.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: 'https://xiaolaji.site/social.png',
          },
        },
      ],
    }),
    mdx(), // 让内容文件可以用 .mdx（Markdown + 组件）
  ],
  experimental: {
    clientPrerender: true, // 浏览器端预渲染链接目标，加快站内导航
  },
  vite: {
    plugins: [tailwindcss()], // Tailwind v4 通过 Vite 插件接入（无 tailwind.config.js）
  },
});
