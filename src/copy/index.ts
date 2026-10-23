import type { MarketingLocale } from '@utils/locale';
import { zh } from './zh';

/**
 * ── 文案模块：全站界面文字的“总字典”──────────────────────────────
 *
 * 【为什么要有它】
 *   组件和视图里不写死任何用户可见的文字（这是全站铁律）。
 *   想改网页上的一句话？改 ./zh.ts 里对应的字段，不用翻组件。
 *
 * 【怎么读】
 *   组件里：const { copy: t } = Astro.locals; // middleware 已挂好
 *   视图里：const t = getCopy(locale);       // 已经手上有 locale 时
 *
 * 【结构约束】
 *   Copy 类型 = zh.ts 的完整结构，所有语言都必须满足（以后加语言也一样）。
 *   这也是 pnpm build 的一部分：缺任何字段，类型检查直接失败。
 * ────────────────────────────────────────────────────────────
 */
export type Copy = typeof zh;

const tables: Record<MarketingLocale, Copy> = { zh };

export function getCopy(locale: MarketingLocale): Copy {
  return tables[locale];
}
