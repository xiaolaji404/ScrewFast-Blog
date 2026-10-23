/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * 给 Astro.locals 声明类型。
 * middleware.ts 会在每个请求上挂两个属性，这里告诉 TypeScript 它们是什么类型，
 * 于是任何组件里写 Astro.locals.copy 都能获得自动补全与类型检查。
 * （类比：这是给 request 对象补充自定义属性的类型声明。）
 */
declare namespace App {
  interface Locals {
    /** 当前请求的语言；由 src/middleware.ts 写入。 */
    locale: import('@utils/locale').MarketingLocale;
    /** 当前语言的文案表；由 src/middleware.ts 写入。 */
    copy: import('@/copy').Copy;
  }
}
