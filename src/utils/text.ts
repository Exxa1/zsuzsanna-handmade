// Turn a plain textarea string into paragraphs. Editors just type text with a
// blank line between paragraphs (no Markdown needed); we render each chunk as a
// <p>. Falls back to the other language's value when one is empty.

/** Split a textarea value into paragraph strings (on blank lines). */
export function paragraphs(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Pick a bilingual value for the active language, falling back to the other. */
export function pick(
  field: { hu?: string; en?: string } | undefined,
  lang: "hu" | "en",
): string {
  if (!field) return "";
  const other = lang === "hu" ? "en" : "hu";
  return (field[lang] || field[other] || "").trim();
}
