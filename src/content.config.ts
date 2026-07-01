// Astro Content Layer config (Astro 6+). Collections live here, each with a loader.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// A small bilingual text field, reused across dolls and pages. Either language
// may be left empty; the page falls back to the other when one is missing.
const bilingual = z
  .object({
    hu: z.string().optional().default(""),
    en: z.string().optional().default(""),
  })
  .default({ hu: "", en: "" });

// Blog posts — co-located: src/content/posts/<slug>/index.md + its images, so
// the body images and the cover are optimized by astro:assets automatically.
const posts = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishedAt: z.date(),
      description: z.string(),
      isPublish: z.boolean().default(true),
      isDraft: z.boolean().default(false),
      // Language of this post. Posts are written in one language at a time; a
      // post simply appears in that language's blog list (and falls back there).
      lang: z.enum(["hu", "en"]).default("hu"),
      // Explicit URL slug — folder names may differ, so we route by this.
      slug: z.string(),
      // Free-form labels; no fixed taxonomy.
      tags: z.array(z.string()).default([]),
      // Cover image (co-located) — optimized + used for the card and OG.
      cover: image().optional(),
    }),
});

// Dolls — one folder per doll: src/content/dolls/<slug>/index.yaml + its photos
// (co-located, so astro:assets optimizes them). Each doll shows on the home
// grid and gets its own detail page at /dolls/<slug>. Language-neutral except
// the description, which is bilingual.
const dolls = defineCollection({
  loader: glob({ pattern: "**/index.yaml", base: "./src/content/dolls" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      // Explicit URL slug (e.g. "lilla-baba").
      slug: z.string(),
      // Display order on the home grid (lower numbers first).
      order: z.number().default(0),
      // Optional — defaults to available. Sold dolls show a "Sold" badge.
      available: z.boolean().optional().default(true),
      // Optional price, written exactly as it should appear (e.g. "120€").
      price: z.string().optional(),
      // Bilingual description shown on the detail page.
      description: bilingual,
      // Card image; defaults at render to the first photo if unset.
      cover: image().optional(),
      // Ordered photo set. Empty alt falls back to the doll's name at render.
      images: z
        .array(z.object({ src: image(), alt: z.string().optional().default("") }))
        .default([]),
    }),
});

// Pages — singleton content for the fixed pages (home, about, contact). One
// YAML file per page, with a small bilingual field set. Images are co-located
// so they're optimized. The fields a given page uses are documented in the CMS
// (public/admin/config.yml); unused fields are simply omitted from that file.
const pages = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      // Used by all pages: the page heading + a block of intro/body text.
      heading: bilingual.optional(),
      text: bilingual.optional(),
      // Home page only.
      bannerImage: image().optional(),
      bannerAlt: z.string().optional(),
      dollsHeading: bilingual.optional(),
      // About page only.
      photo: image().optional(),
      photoAlt: z.string().optional(),
    }),
});

export const collections = { posts, dolls, pages };
