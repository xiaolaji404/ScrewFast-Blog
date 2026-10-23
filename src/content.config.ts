/**
 * ── 内容集合配置：定义“文章能写什么”──────────────────────────────
 *
 * 【什么是内容集合（Content Collection）】
 *   把 Markdown/MDX 文件当作“数据”来管理：每个文件都按同一套 schema 校验，
 *   frontmatter 写错字段名或类型时，pnpm build 会直接报错（而不是运行时才发现）。
 *
 * 【四个集合】
 *   blog     博客文章    src/content/blog/zh/*.md
 *   insights 随想        src/content/insights/zh/*.md
 *   products 产品        src/content/products/zh/*.md
 *   docs     Starlight 文档（自带 loader 与 schema，无需自定义）
 *
 * 【三个本地化集合的通用规则】
 *   - 文件必须放在 <集合>/zh/ 目录下（zh 与 MARKETING_LOCALES 一致）
 *   - 以“_”开头的文件会被忽略（可用来放草稿）
 *   - 想给文章加新字段：在下方 schema 里加一行 z.xxx 即可
 *
 * 官方文档：https://docs.astro.build/en/guides/content-collections/
 * ────────────────────────────────────────────────────────────
 */

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

// 产品：字段最复杂（规格表、选项卡、蓝图）。不用产品页时可整块删除，
// 并同步删除 collections 导出项与 src/content/products/ 目录。
const productsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/products',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      main: z.object({
        id: z.number(),
        content: z.string(),
        imgCard: image(),
        imgMain: image(),
        imgAlt: z.string(),
      }),
      tabs: z.array(
        z.object({
          id: z.string(),
          dataTab: z.string(),
          title: z.string(),
        })
      ),
      longDescription: z.object({
        title: z.string(),
        subTitle: z.string(),
        btnTitle: z.string(),
        btnURL: z.string(),
      }),
      descriptionList: z.array(
        z.object({
          title: z.string(),
          subTitle: z.string(),
        })
      ),
      specificationsLeft: z.array(
        z.object({
          title: z.string(),
          subTitle: z.string(),
        })
      ),
      specificationsRight: z
        .array(
          z.object({
            title: z.string(),
            subTitle: z.string(),
          })
        )
        .optional(),
      tableData: z
        .array(
          z.object({
            feature: z.array(z.string()),
            description: z.array(z.array(z.string())),
          })
        )
        .optional(),
      blueprints: z.object({
        first: image().optional(),
        second: image().optional(),
      }),
    }),
});

// 博客文章：标题/描述/作者/头像/日期/封面/阅读时长，tags 可选。
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string(),
      role: z.string().optional(),
      authorImage: image(),
      authorImageAlt: z.string(),
      pubDate: z.date(),
      cardImage: image(),
      cardImageAlt: z.string(),
      readTime: z.number(),
      tags: z.array(z.string()).optional(),
    }),
});

// 随想：字段最少，适合短内容。
const insightsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/insights',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // contents: z.array(z.string()),
      cardImage: image(),
      cardImageAlt: z.string(),
    }),
});

// 四个集合的注册表：上面定义的集合必须在这里登记，否则 getCollection 读不到。
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  products: productsCollection,
  blog: blogCollection,
  insights: insightsCollection,
};
