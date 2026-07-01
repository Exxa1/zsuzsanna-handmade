// ============================================================
// i18n dictionary — UI chrome strings (nav, footer, buttons, 404…)
//
// HOW TO USE
//  - Add a key under BOTH `hu` and `en` (they must share the exact same keys).
//  - Read it in a component with: const t = useTranslations(lang); t('nav.home')
//  - Page/long-form copy does NOT go here — that lives in the CMS content
//    (src/content/pages/*.yaml, the dolls, and the blog posts).
//
// `defaultLang` is served at the root ("/"), every other locale is prefixed
// ("/en/…"). This is wired up in astro.config.mjs (i18n) — keep them in sync.
// ============================================================

export const languages = {
  hu: "Magyar",
  en: "English",
} as const;

export const defaultLang = "hu";

export const ui = {
  hu: {
    "nav.home": "Főoldal",
    "nav.blog": "Blog",
    "nav.about": "Bemutatkozás",
    "nav.contact": "Kapcsolat",

    "footer.usefulLinks": "Hasznos linkek",
    "footer.contact": "Kapcsolat",
    "footer.blog": "Blog",
    "footer.about": "Bemutatkozás",
    "footer.legal": "Jogi információk",
    "footer.privacy": "Adatkezelési tájékoztató",
    "footer.terms": "ÁSZF",
    "footer.imprint": "Impresszum",
    "footer.rights": "Minden jog fenntartva",
    "footer.credit": "A weboldalt készítette: Kuna Áron",

    "dolls.title": "Babák",
    "dolls.available": "Elérhető",
    "dolls.sold": "Elkelt",
    "dolls.back": "Vissza a babákhoz",

    "blog.title": "Blog",
    "blog.back": "Vissza a bloghoz",

    "contact.cta": "Írj nekem",

    "notFound.alert": "404",
    "notFound.message": "Ez az oldal nem található",
    "notFound.action": "Vissza a főoldalra",
  },
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.about": "About me",
    "nav.contact": "Contact",

    "footer.usefulLinks": "Useful links",
    "footer.contact": "Contact",
    "footer.blog": "Blog",
    "footer.about": "About me",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.imprint": "Imprint",
    "footer.rights": "All rights reserved",
    "footer.credit": "Website made by Áron Kuna",

    "dolls.title": "Dolls",
    "dolls.available": "Available",
    "dolls.sold": "Sold",
    "dolls.back": "Back to the dolls",

    "blog.title": "Blog",
    "blog.back": "Back to the blog",

    "contact.cta": "Write to me",

    "notFound.alert": "404",
    "notFound.message": "This page could not be found",
    "notFound.action": "Back to the homepage",
  },
} as const;
