import { SITE } from '@data/constants';
import { getCopy } from '@/copy';
import {
  LOCALE_INFO,
  MARKETING_LOCALES,
  alternatePaths,
  localePath,
  type MarketingLocale,
} from '@utils/locale';

/**
 * ── 元数据模块：把“页面是什么”翻译成 <head> 里的一切 ─────────────────
 *
 * 【它解决什么痛点】
 *   一个页面通常只需要知道自己“是什么”：标题、描述、页面类型。
 *   其余一整套 SEO 东西（Open Graph、canonical、JSON-LD 结构化数据等）
 *   全由本文件根据这五个输入推导出来，页面完全不用操心：
 *
 *     输入（页面知道的）        输出（<head> 需要的）
 *     ────────────────────      ─────────────────────────────
 *     locale / pathname    →    canonical、hreflang、绝对 URL
 *     title / description  →    <title>、meta description、OG 字段
 *     kind                 →    schema.org JSON-LD（搜索引擎认识的那套）
 *
 * 【谁在用它】
 *   MainLayout.astro 是唯一的调用方；它把渲染结果交给 Meta.astro 输出到 <head>。
 *   因此页面永远不用手写 schema.org 对象，也不用手拼站点的域名。
 *   —— 改域名只需要改 @data/constants 里的 SITE.url。
 *
 * 纯函数：接收普通值、返回普通值，方便测试。
 * ────────────────────────────────────────────────────────────────
 */

/** What kind of thing the page is, for JSON-LD. */
export type PageKind =
  | { type: 'WebPage' }
  | {
      type: 'BlogPosting';
      image: string;
      datePublished: Date;
      author: string;
    }
  | { type: 'Article'; image: string }
  | { type: 'Product' };

export interface PageMetadataInput {
  locale: MarketingLocale;
  /** Site-relative pathname of the page (`Astro.url.pathname`). */
  pathname: string;
  /** Page title without the site suffix. Omit on the home page. */
  title?: string;
  /** `<meta name="description">`; falls back to the site description. */
  description?: string;
  /** Open Graph / Twitter title; falls back to the site OG title. */
  ogTitle?: string;
  /**
   * Site section the page belongs to (e.g. "Blog"). When given and no
   * `ogTitle` is set, the OG title becomes `<title> | <section> | <site>`.
   */
  section?: string;
  kind?: PageKind;
}

export interface PageMetadata {
  lang: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  jsonLd: Record<string, unknown>;
}

/** Absolute URL on the marketing site; the root has no trailing slash. */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE.url : `${SITE.url}${path}`;
}

export function buildPageMetadata(input: PageMetadataInput): PageMetadata {
  const { locale, pathname, kind = { type: 'WebPage' } } = input;
  const copy = getCopy(locale);
  const info = LOCALE_INFO[locale];

  const title = input.title ? `${input.title} | ${SITE.title}` : SITE.title;
  const description = input.description ?? copy.site.description;
  const ogTitle =
    input.ogTitle ??
    (input.title && input.section
      ? `${input.title} | ${input.section} | ${SITE.title}`
      : copy.site.ogTitle);
  const ogDescription = input.description ?? copy.site.ogDescription;
  const canonical = absoluteUrl(pathname);

  const paths = alternatePaths(pathname);
  const alternates = MARKETING_LOCALES.map(alt => ({
    hreflang: LOCALE_INFO[alt].lang,
    href: absoluteUrl(paths[alt]),
  }));

  const publisher = {
    '@type': 'Organization',
    name: SITE.title,
    logo: { '@type': 'ImageObject', url: `${SITE.url}/favicon.ico` },
  };

  let jsonLd: Record<string, unknown>;
  switch (kind.type) {
    case 'BlogPosting':
      jsonLd = {
        '@type': 'BlogPosting',
        headline: input.title,
        image: kind.image,
        datePublished: kind.datePublished.toISOString(),
        author: { '@type': 'Person', name: kind.author },
        publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      };
      break;
    case 'Article':
      jsonLd = {
        '@type': 'Article',
        headline: input.title,
        description,
        image: kind.image,
        author: { '@type': 'Organization', name: SITE.title },
        publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      };
      break;
    case 'Product':
      jsonLd = {
        '@type': 'Product',
        '@id': canonical,
        name: input.title,
        description,
        brand: { '@type': 'Brand', name: SITE.title },
      };
      break;
    default:
      jsonLd = {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: ogTitle,
        description,
        isPartOf: {
          '@type': 'WebSite',
          url: absoluteUrl(localePath(locale)),
          name: SITE.title,
          description: copy.site.descriptionShort,
        },
      };
  }

  return {
    lang: info.lang,
    title,
    description,
    ogTitle,
    ogDescription,
    ogLocale: info.ogLocale,
    canonical,
    alternates,
    jsonLd: {
      '@context': 'https://schema.org',
      ...jsonLd,
      inLanguage: info.inLanguage,
    },
  };
}
