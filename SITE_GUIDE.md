# SITE GUIDE — Zsuzsánna Hand-made

The maintenance & contributor guide. Pairs with **[README.md](README.md)** (quick
start + repoint checklist) and **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** (the visual
system). If you only edit text and photos, you can stay in the CMS at `/admin`
and skip most of this.

---

## 1. Philosophy: content vs. design

The site keeps **content** and **design** apart:

- **Content** lives in `src/content/**` (YAML + Markdown) and is editable in the
  **CMS** by a non-technical person.
- **Design** lives in `src/styles/` (CSS tokens) and `src/layouts/` +
  `src/components/` (markup). Editors never need to touch these.
- **Routes** in `src/pages/**` are thin glue — usually just "load this content,
  render it with this layout."

To **re-skin** the whole site you edit two files (`tokens.css`, `fonts.css`); to
**re-point** it to a new brand/domain you edit a handful of config files (see the
README repoint checklist).

---

## 2. Project structure

```
src/
  config/site.ts        # SITE_URL, SEO defaults, analytics  (per-instance config)
  data/
    presentation.ts     # brand name + social links (Facebook/Instagram)
    nav_items.ts         # menu links + the contact CTA (locale-aware)
  i18n/
    ui.ts                # UI string dictionary (HU + EN) — nav, footer, badges…
    utils.ts             # i18n helpers (getLangFromUrl, localizePath, …)
  styles/
    tokens.css           # ← THE BRAND: colours, fonts, roundness
    fonts.css            # @fontsource imports (Amatic SC + Nunito)
    global.css, prose.css, scrollbar.css
  content.config.ts      # the 3 content collections + their schemas
  content/
    dolls/<slug>/index.yaml + photos
    pages/{home,about,contact}.yaml + images
    posts/<slug>/index.md + images        # the Blog
  layouts/               # HomeLayout, AboutLayout, ContactLayout, DollLayout,
                         # ArticleLayout, BaseLayout, LegalLayout
  components/            # Header_*, Footer, ui/* primitives, seo/, Utilities/
  pages/                 # routes (file = URL); /en mirrors the HU pages
public/
  admin/                 # the Sveltia CMS (index.html + config.yml)
  cookie-banner/         # Silktide consent banner
  opengraph-image.jpg, favicon.svg
```

---

## 3. Content collections

Defined + validated in **`src/content.config.ts`**; surfaced to editors in
**`public/admin/config.yml`**. Keep those two in sync if you change a field.

### 3.1 Dolls (`src/content/dolls/<slug>/index.yaml`)

One folder per doll, with its photos co-located (so they're optimized at build).

| Field | Required | Notes |
| :--- | :--- | :--- |
| `name` | yes | The doll's name (same in both languages). |
| `slug` | yes | URL segment, e.g. `lilla-baba` → `/dolls/lilla-baba`. |
| `order` | – | Sort on the home grid; lower numbers first (default 0). |
| `available` | – | `false` shows a "Sold" badge. Defaults to available. |
| `price` | – | Free text, e.g. `"120€"`. Omit to hide. |
| `description` | – | `{ hu, en }` text shown on the detail page. |
| `cover` | – | Card image; defaults to the first photo if unset. |
| `images` | – | List of `{ src, alt }` shown in the gallery. |

Rendered by `src/layouts/DollLayout.astro`; listed on the home page by
`src/layouts/HomeLayout.astro`. Detail routes: `src/pages/dolls/[slug].astro`
(+ `src/pages/en/dolls/[slug].astro`).

### 3.2 Pages (`src/content/pages/*.yaml`)

Three singleton files driving the fixed pages. Each has a small **bilingual**
field set (`{ hu, en }`), and text fields are plain textareas — type paragraphs
separated by a blank line (no Markdown needed; see `src/utils/text.ts`).

- `home.yaml` — `heading`, `text` (intro), `dollsHeading`, `bannerImage`, `bannerAlt`.
- `about.yaml` — `heading`, `text`, `photo`, `photoAlt`.
- `contact.yaml` — `heading`, `text`.

Rendered by `HomeLayout`, `AboutLayout`, `ContactLayout`.

### 3.3 Blog (`src/content/posts/<slug>/index.md`)

Co-located Markdown. Frontmatter: `title`, `slug`, `description`, `publishedAt`,
`cover`, `tags`, `lang` (`hu`/`en`), `isPublish`, `isDraft`. The body is Markdown
(text + images). A post appears in its language's blog list only — write it once
per language you want it in. Rendered by `ArticleLayout.astro`.

---

## 4. Routing & pages

`src/pages/` mirrors the URL. Hungarian pages sit at the root; their English
counterparts under `src/pages/en/`. The page files are thin and delegate to a
layout:

| URL | File | Renders |
| :--- | :--- | :--- |
| `/`, `/en` | `index.astro`, `en/index.astro` | `HomeLayout` |
| `/dolls/<slug>` | `dolls/[slug].astro` (+ en) | `DollLayout` |
| `/about` | `about/index.astro` (+ en) | `AboutLayout` |
| `/contact` | `contact/index.astro` (+ en) | `ContactLayout` |
| `/blog`, `/blog/<slug>` | `blog/index.astro`, `blog/[slug].astro` (+ en) | inline / `ArticleLayout` |
| legal | `footer/*.md` | `LegalLayout` (via frontmatter `layout:`) |
| 404 | `404.astro` | bilingual not-found |

Each layout reads the active language with `getLangFromUrl(Astro.url)`, so the HU
and EN page files are identical one-liners.

---

## 5. Languages / i18n

Configured in `astro.config.mjs` (`i18n`): `hu` at root, `en` prefixed, with a
redirect fallback for HU-only pages. The `isBilingual()` helper there lists which
routes have a real English page (for correct sitemap/hreflang).

- **UI chrome** (menu, footer, badges, 404): `src/i18n/ui.ts` — add every key
  under **both** `hu` and `en`.
- **Page copy**: in the content (Pages/Dolls carry both languages per entry;
  Blog posts are per-language).
- Helpers in `src/i18n/utils.ts`: `getLangFromUrl`, `useTranslations`,
  `localizePath`, `stripLocale`.

---

## 6. Images

- Store images **next to the content that uses them** (co-located) so
  `astro:assets` + `sharp` optimize them at build. The CMS does this
  automatically (relative `media_folder`).
- Always render through `src/components/ui/Picture.astro` (enforces optimization
  + required `alt`). It accepts an imported asset or a path string (resolved by
  `src/lib/images.ts`).
- The CMS also converts uploads to WebP (`media_libraries` in `config.yml`).
- The seed images under `src/content/**` are generated placeholders — replace
  them with real photos.

---

## 7. The CMS (Sveltia at `/admin`)

- A static client app in `public/admin/` (`index.html` + `config.yml`), GitHub
  backend, editorial workflow.
- Collections: **Dolls**, **Pages** (Home/About/Contact), **Blog** — see §3.
- In dev, "Work with Local Repository" edits local files; on the deployed site it
  authenticates via GitHub OAuth (see README repoint step 3).
- If you add/rename a field in `content.config.ts`, mirror it in `config.yml`
  (and vice-versa) or the editor and the build will disagree.

---

## 8. Design tokens & fonts

- **`src/styles/tokens.css`** is the single source of truth for colour, type, and
  roundness, as **semantic tokens** (`colorfor-*`) mapped from raw primitives.
  Markup only uses the semantic tokens. Re-skin by editing this file.
- **`src/styles/fonts.css`** imports the fonts (Amatic SC for headings/wordmark,
  Nunito for body). Swap fonts here + update the font tokens.
- Full palette/typography reference: **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)**.

---

## 9. SEO, analytics, cookie banner, legal

- **SEO**: defaults in `src/config/site.ts` (`seo`), applied by
  `src/components/seo/SEOTags.astro`; pages pass per-page `title`/`og`.
- **Sitemap**: `@astrojs/sitemap` in `astro.config.mjs`.
- **Analytics**: GoatCounter `<script>` in `BaseLayout.astro`, code in
  `site.ts` (placeholder — see repoint).
- **Cookie banner**: Silktide in `public/cookie-banner/` — currently "necessary
  only" (GoatCounter is cookieless).
- **Legal pages**: `src/pages/footer/*.md` — placeholder templates; fill in real
  details. Linked from the footer (`src/components/Footer.astro`).

All of these are covered in the **README "Going live / repoint"** checklist.

---

## 10. Deployment

Static Astro build on **Netlify** (`netlify.toml`: `npm run build` → `dist/`).
Merging to the default branch (or publishing in the CMS) redeploys. No server /
adapter — the CMS is a static client app.

---

## 11. Recipes

**Add a doll** → CMS → *Dolls* → *New Doll* (name, slug, photos, optional price,
Available toggle, HU/EN description). Or add `src/content/dolls/<slug>/index.yaml`
+ photos by hand. It shows on the home grid and gets a page automatically.

**Mark a doll sold** → uncheck *Available* (or set `available: false`). It keeps
showing with a "Sold" badge; delete the entry to remove it entirely.

**Add a blog post** → CMS → *Blog* → *New* (pick the *Language*). Or add
`src/content/posts/<slug>/index.md` + images.

**Edit Home/About/Contact text** → CMS → *Pages* → the relevant entry (fill the
Magyar + English fields).

**Re-skin** → edit `src/styles/tokens.css` (colours/roundness) and
`src/styles/fonts.css` (fonts). See DESIGN_GUIDE.

**Add a UI string** → add the key under both `hu` and `en` in `src/i18n/ui.ts`,
then read it with `const t = useTranslations(lang); t("your.key")`.

**Add a new menu item** → edit `src/data/nav_items.ts` (+ a string in `ui.ts`).
