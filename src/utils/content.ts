import { getCollection, type CollectionEntry } from 'astro:content';
import {
  DEFAULT_LOCALE,
  isMarketingLocale,
  localePath,
  type MarketingLocale,
} from '@utils/locale';

/**
 * ── 内容模块：把“文章文件”翻译成“网站页面”的唯一权威 ───────────────
 *
 * 你可能已经注意到：写一篇新文章，并不需要手动创建任何页面。
 * 秘密就在本文件：任意一个内容条目（Markdown 文件）都自带一个 id，
 * 形如 `<语言>/<文件名>`（例：`zh/my-first-post`）。本文件负责把 id 翻译成：
 *
 *   - 这篇属于哪个语言      → localeOf(entry)
 *   - 文件名（URL 片段）   → slugOf(entry)
 *   - 它应该出现在哪个 URL  → pathFor(entry)
 *   - 同集合的条目列表       → entriesFor(collection, locale)
 *   - 生成静态路由参数       → staticPathsFor(collection, locale)
 *
 * 【你需要注意的一件事】
 *   保存文章的目录结构是有含义的：src/content/<集合>/<语言>/<文件名>.md
 *   目录名必须正好是 `zh`（与 MARKETING_LOCALES 一致），文件名就是 URL 片段。
 *
 * 卡片组件（如 CardBlog）和页面的 [id].astro 路由都只接收“条目”，
 * 然后向本文件“询问”链接等信息，所以**永远不要自己拼 `/blog/${id}` 这种 URL**。
 * ────────────────────────────────────────────────────────────────
 */

export type LocalisedCollection = 'blog' | 'insights' | 'products';
export type LocalisedEntry<
  C extends LocalisedCollection = LocalisedCollection,
> = CollectionEntry<C>;

/** Unlocalised route prefix of each collection. */
const ROUTES: Record<LocalisedCollection, string> = {
  blog: '/blog',
  insights: '/insights',
  products: '/products',
};

/** Default ordering of each collection wherever it is listed. */
const SORTERS: {
  [C in LocalisedCollection]: (
    a: CollectionEntry<C>,
    b: CollectionEntry<C>
  ) => number;
} = {
  blog: (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  products: (a, b) => a.data.main.id - b.data.main.id,
  insights: () => 0,
};

/** The locale an entry was authored in, from its id prefix. */
export function localeOf(entry: LocalisedEntry): MarketingLocale {
  const prefix = entry.id.split('/')[0];
  return isMarketingLocale(prefix) ? prefix : DEFAULT_LOCALE;
}

/** The entry's id without its locale prefix; the route param for `[id]`. */
export function slugOf(entry: LocalisedEntry): string {
  return entry.id.replace(/^[^/]+\//, '');
}

/** Site-relative path of an entry's page, e.g. `/fr/blog/post-1/`. */
export function pathFor(entry: LocalisedEntry): string {
  return `${localePath(localeOf(entry), ROUTES[entry.collection])}/${slugOf(entry)}/`;
}

/** Entries of one collection in one locale, in that collection's order. */
export async function entriesFor<C extends LocalisedCollection>(
  collection: C,
  locale: MarketingLocale
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection, ({ id }) =>
    id.startsWith(`${locale}/`)
  );
  return entries.sort(
    SORTERS[collection] as (
      a: CollectionEntry<C>,
      b: CollectionEntry<C>
    ) => number
  );
}

/** The same entry in another locale, if it has been translated. */
export async function siblingOf<C extends LocalisedCollection>(
  entry: CollectionEntry<C>,
  locale: MarketingLocale
): Promise<CollectionEntry<C> | undefined> {
  const siblings = (await entriesFor(
    entry.collection,
    locale
  )) as CollectionEntry<C>[];
  const slug = slugOf(entry);
  return siblings.find(candidate => slugOf(candidate) === slug);
}

/**
 * `getStaticPaths` result for one collection in one locale, so every
 * `[id].astro` route is a one-liner.
 */
export async function staticPathsFor<C extends LocalisedCollection>(
  collection: C,
  locale: MarketingLocale
) {
  const entries = await entriesFor(collection, locale);
  return entries.map(entry => ({
    params: { id: slugOf(entry) },
    props: { entry },
  }));
}
