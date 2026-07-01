// ============================================================
// Site / instance config — the per-client technical settings.
// This + tokens.css + fonts.css are the only files you edit to spin up a new
// client. (Editor-facing brand content like socials lives in presentation.ts.)
//
// ⚠️ BEFORE GOING LIVE — replace the placeholders below and in
// public/admin/config.yml. See the "Going live / repoint" guide in README.md.
// ============================================================

// TODO(repoint): set this to the real domain (also update public/admin/config.yml → site_url).
export const SITE_URL = "https://mesehely.example/";

// Languages — Hungarian at the root ("/"), others prefixed ("/en/").
export const DEFAULT_LOCALE = "hu";
export const LOCALES = ["hu", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// Default SEO — per-page values override these.
export const seo = {
  title: "Zsuzsánna Hand-made — kézzel készült babák",
  description:
    "Szeretettel, kézzel készült babák és játékok. Minden darab egyedi.",
  ogImage: "/opengraph-image.jpg",
  ogAlt: "Zsuzsánna Hand-made — kézzel készült baba",
  twitter: "@mesehely",
};

// Privacy-friendly analytics (GoatCounter).
// TODO(repoint): create a GoatCounter site and set its counter URL here, or
// remove this + the <script> in src/layouts/BaseLayout.astro to drop analytics.
export const analytics = {
  goatcounter: "https://YOUR-CODE.goatcounter.com/count",
};
