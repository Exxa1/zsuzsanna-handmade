// Locale-aware navigation. Labels come from the i18n dictionary; links are
// prefixed for the active language (e.g. "/blog" → "/en/blog" in English).
//
// Usage in a component:
//   const lang = getLangFromUrl(Astro.url);
//   const nav_items = getNavItems(lang);
//   const call_to_action = getCallToAction(lang);

import { useTranslations, localizePath, type Lang } from "@/i18n/utils";

type NavItem = {
  name: string;
  link: string;
};

export function getNavItems(lang: Lang): NavItem[] {
  const t = useTranslations(lang);
  return [
    { name: t("nav.home"), link: localizePath("/", lang) },
    { name: t("nav.blog"), link: localizePath("/blog", lang) },
    { name: t("nav.about"), link: localizePath("/about", lang) },
  ];
}

export function getCallToAction(lang: Lang): NavItem {
  const t = useTranslations(lang);
  return { name: t("nav.contact"), link: localizePath("/contact", lang) };
}
