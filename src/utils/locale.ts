/**
 * ── 语言模块：全站“语言”这个概念的唯一权威 ─────────────────────────
 *
 * 任何地方想知道“有哪些语言 / 当前是什么语言 / 某个路径在某种语言下长什么样”，
 * 都只应该从这里问，不要自己写字符串判断。
 *
 * 【本站现状】
 *   只发布中文（zh）。默认语言不带 URL 前缀，
 *   所以首页就是 `/`，博客是 `/blog/`……
 *
 * 【如果将来想加语言】
 *   需要动的地方集中在本文件：
 *     1. MARKETING_LOCALES 里加上新语言代号
 *     2. LOCALE_INFO 里补上新语言的 5 个标标（标签、lang、ogLocale 等）
 *   其余部分（copy 表、页面壳）按 docs/customization.md 的“新增语言”章节操作。
 *
 * 【与 Starlight 文档站的关系】
 *   Starlight（/welcome-to-docs/）有自己独立的语言机制，不走本模块。
 *
 * 本文件所有函数都是纯函数（输入确定→输出确定，无副作用），改起来安全。
 * ────────────────────────────────────────────────────────────────
 */

export const MARKETING_LOCALES = ['zh'] as const;
export type MarketingLocale = (typeof MARKETING_LOCALES)[number];

export const DEFAULT_LOCALE: MarketingLocale = 'zh';

/** Locales that carry a URL prefix (every locale except the default). */
const PREFIXED_LOCALES: readonly MarketingLocale[] = MARKETING_LOCALES.filter(
  locale => locale !== DEFAULT_LOCALE
);

/** Per-locale constants: display label, language tags and Intl tag. */
export const LOCALE_INFO: Record<
  MarketingLocale,
  {
    /** Human label for the language picker. */
    label: string;
    /** `<html lang>` and `hreflang` value. */
    lang: string;
    /** `og:locale` value. */
    ogLocale: string;
    /** schema.org `inLanguage` value. */
    inLanguage: string;
    /** BCP 47 tag for `Intl` formatting. */
    intl: string;
  }
> = {
  zh: {
    label: '简体中文',
    lang: 'zh-CN',
    ogLocale: 'zh_CN',
    inLanguage: 'zh-CN',
    intl: 'zh-CN',
  },
};

export function isMarketingLocale(value: unknown): value is MarketingLocale {
  return (
    typeof value === 'string' &&
    (MARKETING_LOCALES as readonly string[]).includes(value)
  );
}

/**
 * Split a pathname into the locale it is prefixed with and the rest of the
 * path. The default locale has no prefix.
 *
 *   '/blog/post-1/' -> { locale: 'zh', path: '/blog/post-1/' }
 *   '/blog/'        -> { locale: 'zh', path: '/blog/' }
 */
export function splitLocale(pathname: string): {
  locale: MarketingLocale;
  path: string;
} {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  for (const locale of PREFIXED_LOCALES) {
    const prefix = `/${locale}`;
    if (normalized === prefix) return { locale, path: '/' };
    if (normalized.startsWith(`${prefix}/`)) {
      return { locale, path: normalized.slice(prefix.length) };
    }
  }
  return { locale: DEFAULT_LOCALE, path: normalized };
}

/**
 * Resolve the locale of the current request. The pathname is authoritative
 * for marketing pages; `Astro.currentLocale` (driven by Starlight's i18n
 * config) is only a fallback.
 */
export function resolveLocale(
  pathname: string,
  currentLocale?: string | undefined
): MarketingLocale {
  const { locale } = splitLocale(pathname);
  if (locale !== DEFAULT_LOCALE) return locale;
  if (isMarketingLocale(currentLocale)) return currentLocale;
  return DEFAULT_LOCALE;
}

/**
 * Build a site-relative path for a locale.
 *
 *   localePath('zh', '/products') -> '/products'  （默认语言无前缀）
 *   localePath('zh')              -> '/'
 *   localePath('zh', '#')         -> '#'   (fragments and absolute URLs pass through)
 */
export function localePath(locale: MarketingLocale, path = '/'): string {
  if (path.startsWith('#') || /^[a-z]+:/i.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  if (clean === '/') return `/${locale}`;
  return `/${locale}${clean}`;
}

/**
 * The same page in every marketing locale, for hreflang links and the
 * language picker. Works from any localised or unlocalised pathname.
 */
export function alternatePaths(
  pathname: string
): Record<MarketingLocale, string> {
  const { path } = splitLocale(pathname);
  return Object.fromEntries(
    MARKETING_LOCALES.map(locale => [locale, localePath(locale, path)])
  ) as Record<MarketingLocale, string>;
}
