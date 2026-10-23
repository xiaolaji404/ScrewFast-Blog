import { defineMiddleware } from 'astro:middleware';
import { resolveLocale } from '@utils/locale';
import { getCopy } from '@/copy';

/**
 * ── 请求中间件：每个页面请求的“第一站” ───────────────────────────────
 *
 * 【它在流水线中的位置】
 *   浏览器请求
 *     → middleware（本文件）      ← 你在读这里：识别语言、准备文案
 *     → 路由壳 src/pages/…        ← 一行代码，决定 URL 对应哪个视图
 *     → 视图 src/views/…          ← 取文案、选区块、传数据
 *     → 布局/组件                  ← 渲染成 HTML
 *
 * 【它只做两件事】
 *   1. 根据 URL 解析当前语言（本站只有中文 zh，默认语言无 URL 前缀）
 *   2. 把语言对象和对应的文案表挂到 Astro.locals 上
 *
 * 【为什么要这样做】
 *   Astro.locals 相当于给“每一次请求”发了一个随身包：
 *   之后任何组件（导航栏、页脚、卡片……）都能直接取
 *     Astro.locals.locale  → 当前语言
 *     Astro.locals.copy    → 当前语言的文案表
 *   而不必从顶层一层层把参数传下去（类似 Java 的 Filter 往 request 里塞属性）。
 *
 * 注意：免费博客是纯静态站点，构建时 astro 会对每个页面各执行一次本文件。
 * ────────────────────────────────────────────────────────────────────
 */
export const onRequest = defineMiddleware((context, next) => {
  const locale = resolveLocale(context.url.pathname, context.currentLocale);
  context.locals.locale = locale;
  context.locals.copy = getCopy(locale);
  return next();
});
