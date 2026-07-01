# Zsuzsánna Hand-made

The website of **Zsuzsánna Hand-made** — lovingly handmade dolls. A **bilingual
(Hungarian / English)** static site built with **Astro** and **Tailwind CSS**,
where **content and design are fully separated**: content is editable through a
friendly **Sveltia CMS** admin panel, and the look is driven by CSS tokens.

## 📚 Documentation

Guides live in this repo — read them before making changes:

- **[SITE_GUIDE.md](SITE_GUIDE.md)** — maintenance & contributor guide: the
  content/design split, the content collections, routing, **languages/i18n**,
  **images**, the **CMS**, SEO, deployment, and recipes.
- **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** — the visual design system: colour
  tokens, typography, components, and brand rules.
- **[EDITING_GUIDE.md](EDITING_GUIDE.md)** — a non-technical, Hungarian
  walkthrough for the client: logging in and editing dolls/pages/blog. Hand
  this one to her, not the guides above.

This README is the quick start; the guides are the source of truth.

## 🧞 Quick start

Requires [Node.js](https://nodejs.org) **≥ 22** (see `.nvmrc`).

```bash
npm install      # install dependencies (one-time)
npm run dev      # start the dev server → http://localhost:4321
```

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Local dev server at `localhost:4321`         |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the built site locally               |

> The CMS in dev is at **http://localhost:4321/admin** (a dev-only middleware in
> `astro.config.mjs` makes the bare `/admin` resolve).

## 🧩 What the site has

- **Home** (`/`) — a banner, a short intro, and a grid of dolls. Each doll links
  to its own page.
- **Doll pages** (`/dolls/<slug>`) — photos, name, optional price, an
  Available/Sold status, and a description.
- **About** (`/about`) — a photo and some text.
- **Contact** (`/contact`) — a short message and large links to Facebook &
  Instagram (no form; contact happens on social).
- **Blog** (`/blog`) — simple text + image posts.

Every page exists in Hungarian (at `/…`) and English (at `/en/…`).

## ✍️ Editing content (the CMS)

Non-technical editing happens at **`/admin`** (Sveltia CMS). Three collections:

| Collection | What it is | Where the files live |
| :--- | :--- | :--- |
| **Dolls** | One entry per doll. Appears on the home page + gets its own page. | `src/content/dolls/<slug>/index.yaml` + photos |
| **Pages** | The Home, About, and Contact texts (Home/About/Contact files). | `src/content/pages/*.yaml` |
| **Blog** | Simple posts (text + images). | `src/content/posts/<slug>/index.md` + images |

- **Adding a doll** automatically adds it to the home grid and creates its page.
  Sold dolls show a "Sold" badge — just uncheck *Available*.
- **Dolls and Pages** carry both languages in one entry (a Hungarian and an
  English field side by side). **Blog posts** are written in one language at a
  time (a *Language* field).
- Editing is **one-click publish**: click *Publish* and it commits straight to
  the repo and triggers a redeploy (no draft/review step to learn).

### Who can log in

The CMS authenticates via **GitHub** and only lets in people added as a
**collaborator** on this repo — see "Client CMS access" below. There's also a
plain-language walkthrough for a non-technical editor in
**[EDITING_GUIDE.md](EDITING_GUIDE.md)** (Hungarian) — hand that to the client
instead of this README.

## 🎨 Changing the look

| I want to change… | Edit… |
| :--- | :--- |
| Colours, fonts, corner roundness | `src/styles/tokens.css` (+ `fonts.css`) — see DESIGN_GUIDE |
| Social links, brand name, email | `src/data/presentation.ts` |
| Menu links / contact CTA | `src/data/nav_items.ts` |
| UI text (nav, footer, 404, badges) | `src/i18n/ui.ts` — the translation dictionary |
| Site URL / domain | **both** `src/config/site.ts` **and** `public/admin/config.yml` |
| A whole page's layout | `src/layouts/*Layout.astro` |

## 🌍 Languages (Hungarian & English)

Uses **Astro's built-in i18n routing**:

- **Hungarian** is the default, at the root: `/`, `/about`, `/blog`, `/dolls/…`.
- **English** is under `/en/`: `/en`, `/en/about`, `/en/blog`, `/en/dolls/…`.
- URL segments are identical in both languages — only the `/en` prefix differs.
- UI chrome strings live in `src/i18n/ui.ts` (add each key under both `hu`/`en`).
- A page that exists **only in Hungarian** falls back its `/en/…` URL to the
  Hungarian version, so nothing dead-ends.

See **[SITE_GUIDE.md](SITE_GUIDE.md)** for details.

## 🚀 Deployment

Hosted on **Netlify**. Build settings are in `netlify.toml`. Pushing/merging to
the default branch runs `npm run build` and deploys `dist/`; the CMS publishes by
committing, so it deploys the same way.

---

## 🛠️ Going live / repoint (do this before launch)

The site ships with **clear placeholders** so it builds without a real domain.
Replace them before going live:

1. **Domain.** `public/admin/config.yml` → `backend.repo`/`backend.branch` are
   already set to the real repo (`Exxa1/zsuzsanna-handmade`, `main`). Once you
   have a Netlify URL or a custom domain, set it as `site_url` there **and** as
   `SITE_URL` in `src/config/site.ts`. The Netlify subdomain (e.g.
   `your-site.netlify.app`) works fine here while you don't have a domain yet.
2. **SEO.** In `src/config/site.ts`, update `seo` (title, description, twitter)
   and replace `public/opengraph-image.jpg` with a real share image.
3. **Client CMS access.** See the dedicated section below.
4. **Analytics (optional).** `src/config/site.ts` → `analytics.goatcounter` has
   a placeholder. Create a free [GoatCounter](https://www.goatcounter.com/) site
   and paste its `…/count` URL, **or** delete that line and the matching
   `<script>` in `src/layouts/BaseLayout.astro` to drop analytics entirely.
5. **Cookie banner (optional).** `public/cookie-banner/silktide-config.js` is set
   to "necessary cookies only" (GoatCounter is cookieless). If you add a tracker
   that sets cookies, add it back there. If you remove analytics, you can also
   remove the banner (the two `<link>`/`<script>` lines in `BaseLayout.astro`).
6. **Legal pages.** `src/pages/footer/*.md` (Impresszum, Adatkezelési
   tájékoztató, ÁSZF, GYIK) are **templates** with `[...]` placeholders. Fill in
   your real details — ideally with a professional. The GYIK (FAQ) page isn't in
   the menu; link it from `src/components/Footer.astro` if you want it.
7. **Brand assets.** Replace `public/favicon.ico` and all placeholder images
   under `src/content/**` (they say "placeholder — replace me") with real photos.
8. **Contact email (optional).** `src/data/presentation.ts` → `mail`.
9. **Client onboarding.** Once step 3 is done, hand the client
   **[EDITING_GUIDE.md](EDITING_GUIDE.md)** — a plain-language (Hungarian)
   walkthrough of logging in and editing.

---

## 👩‍🎨 Client CMS access (set up once)

The repo stays under the developer's GitHub account; the client is added as a
**collaborator** and logs in with her own GitHub account via OAuth. She never
needs repo/Netlify admin access — just Write permission on this one repo.

1. **Deploy to Netlify.** Create a Netlify site from this repo (it auto-detects
   `netlify.toml`: `npm run build` → `dist/`). This gives you a working
   `*.netlify.app` URL to test with before any custom domain exists.
2. **Register a GitHub OAuth App** — GitHub → *Settings → Developer settings →
   OAuth Apps → New OAuth App*. Set the **Authorization callback URL** to
   `https://api.netlify.com/auth/done` (other fields can be anything). Note the
   **Client ID**, then generate and note a **Client Secret**.
3. **Install it as Netlify's OAuth provider** — Netlify → *Site configuration →
   Access control → OAuth → Install provider → GitHub* — paste the Client
   ID/Secret from step 2. This is what powers the "Login with GitHub" button at
   `/admin`.
4. **Add the client as a collaborator** — GitHub repo → *Settings →
   Collaborators → Add people* → her GitHub username or email → grant
   **Write** (not Admin — she doesn't need to touch repo/site settings). She'll
   get an email invite to accept.
5. **She logs in at `/admin`** (the deployed site's `/admin` path) with
   "Login with GitHub" and accepts the OAuth prompt once. After that her
   session persists in the browser she used.

The CMS is already configured for this: `public/admin/config.yml` uses
`publish_mode: simple` (one-click publish, no draft/review board) and does
**not** set `open_authoring` (that flag is for anonymous outside contributors
submitting via forks — not needed for a trusted collaborator with direct
Write access).

> If she doesn't have a GitHub account yet, she can create one free at
> [github.com](https://github.com/join) — see **[EDITING_GUIDE.md](EDITING_GUIDE.md)**
> for the exact steps to give her.

---

Original template design by [maxencewolff](https://www.maxencewolff.com),
further developed by [codenanshu](https://codenanshu.in), and adapted for
Zsuzsánna Hand-made. Website made by Áron Kuna.
