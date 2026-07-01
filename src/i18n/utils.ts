// ============================================================
// i18n helpers — pair with src/i18n/ui.ts
//
//  getLangFromUrl(Astro.url) → "hu" | "en"   (reads the URL prefix)
//  useTranslations(lang)     → t("nav.home")  (dictionary lookup)
//  localizePath("/posts", lang) → "/posts" (hu) | "/en/posts" (en)
//  stripLocale("/en/posts")  → "/posts"      (drops the locale prefix)
// ============================================================

import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;
export type UiKey = keyof (typeof ui)[typeof defaultLang];

/** Detect the active locale from a URL's first path segment. */
export function getLangFromUrl(url: URL): Lang {
  const maybe = url.pathname.split("/")[1];
  if (maybe && maybe in ui) return maybe as Lang;
  return defaultLang;
}

/** Return a translator function bound to a locale, with fallback to default. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Turn a default-language (unprefixed) path into a locale-aware one.
 * The default locale stays unprefixed; others get a "/<lang>" prefix.
 */
export function localizePath(path: string, lang: Lang): string {
  // Leave anchors, external URLs, mailto, etc. untouched.
  if (!path.startsWith("/")) return path;
  if (lang === defaultLang) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

/** Strip any locale prefix from a pathname, returning the bare default path. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments[1] && segments[1] in ui && segments[1] !== defaultLang) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}
