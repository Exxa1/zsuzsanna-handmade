# Zsuzsánna Hand-made — Design Guide

The **visual language** of the site: the look, the rules behind it, and how to
keep new work on-brand.

> **Companion documents:** [`SITE_GUIDE.md`](SITE_GUIDE.md) is the "how" (folders,
> tooling, editing); [`README.md`](README.md) is the quick start + repoint
> checklist. The single source of truth for every value below is
> [`src/styles/tokens.css`](src/styles/tokens.css) — if the code changes, update
> this file.

---

## 1. Brand at a glance

| | |
|---|---|
| **Wordmark** | Zsuzsánna Hand-made *(keep the accented **á**)* |
| **Maker** | Zsuzsánna |
| **Product** | Handmade Waldorf-style dolls, hand-knit dolls, toys |
| **Price format** | Euro, as a suffix — e.g. `120€` |
| **Facebook** | https://www.facebook.com/mesehely |
| **Instagram** | https://www.instagram.com/mesehely/ |
| **Social handle** | `@mesehely` (≈ Hungarian for *fairy-tale workshop*) |
| **Site credit** | Website made by Áron Kuna |

**What the brand stands for:** lovingly handmade, natural materials, heirloom
quality, warmth, childhood wonder. Every piece is one-of-a-kind.

---

## 2. Logo & wordmark

- The logo is **typographic**, not an image: the words **"Zsuzsánna Hand-made"**
  set in the brand display font (Amatic SC), centered in the header and linking
  home.
- Keep the accented **á**. Give the wordmark generous clear space — it's a light,
  airy typeface and needs room to breathe.

---

## 3. Colour palette

A small, warm, earthy palette. Defined as **primitives → semantic tokens** in
`tokens.css`; markup only uses the semantic `colorfor-*` tokens.

| Role | Name | HEX | Where it's used |
|---|---|---|---|
| Background | **Linen / warm white** | `#FFF9F1` | Page background, header |
| Primary / dark | **Feldgrau** (green-grey) | `#586F6B` | Footer, primary "Get Me" button, cards, badges |
| Secondary / accent | **Peach / apricot** | `#FCCEAF` | Secondary button, "Available" badge |
| Text | **Warm near-black** | `#2C2A24` (`ink`) | Body copy |
| Heading | **Black** | `#000000` | Headings & wordmark |
| Muted | **Olive** | `#6E6414` | Secondary / muted text, dates, back-links |
| Accent pop | **Heart red** | `#B91C1C` | The signature heart — used sparingly |

**Pairing rules**
- White text on Feldgrau — primary button, footer, cards, "Sold" badge.
- Black text on Peach — secondary button, "Available" badge.
- Body/olive text on Linen — all content.
- Use Heart Red as a single small emotional accent only.

---

## 4. Typography

The pairing the brand needs: a hand-drawn display face for personality, a clean
sans for legibility.

- **Amatic SC** (400 + 700) — headings, navigation, and the wordmark. It carries
  the entire "handmade" feel. Works best **large**.
- **Nunito** (variable) — body copy. A warm, humanist sans that stays readable in
  long paragraphs, where Amatic SC would be too light.

Both are self-hosted via `@fontsource` (no Google CDN → faster + GDPR-friendly);
imports live in `src/styles/fonts.css`, the font tokens in `tokens.css`. Headings
scale responsively (see `global.css` `@layer base`).

---

## 5. Shape, layout & motion

- **Rounded corners:** soft `rounded-lg` (`--roundedness-* = 0.5rem`) on cards,
  images, badges, and buttons.
- **Layout:** centered and contained (`Section` provides the max-width + padding);
  generous whitespace; the design breathes. Doll grid is 1 → 2 → 3 columns.
- **Buttons:** primary = Feldgrau + white text; secondary = Peach + black text;
  both hover by gently dropping opacity (`hover:opacity-80`).
- **Motion:** soft and subtle — gentle fades/scales, never sharp or bouncy.

---

## 6. Imagery & photography direction

Product photography is central to the brand:

- **Natural light**, soft, shallow depth of field.
- **Settings:** greenery/nature, or textured neutral fabric (linen, lace, cream
  knit). Natural props (dried flowers, wood, wool) — never plastic-looking.
- **Palette:** warm and earthy — cream/linen, dusty rose, sage, terracotta.
- **Mood:** cozy, gentle, nostalgic, storybook.
- **Format:** portrait ~3:4, one doll as the clear hero.

> The images shipped in the repo are **generated placeholders** ("replace me").
> Swap them for real photos before launch.

---

## 7. Iconography

- **Signature mark:** a solid **heart** in heart-red (`#B91C1C`) — the emotional
  accent; use once, small.
- **Social icons:** inline SVG (Facebook, Instagram) in `src/data/presentation.ts`,
  inheriting `currentColor`.
- **Favicon:** `public/favicon.ico` (replace with a brand mark before launch).

---

## 8. Voice & tone

- **Warm, personal, first-person** from the maker ("írj nekem bátran", "write to
  me").
- **Heartfelt and grateful**; gentle and unhurried — never salesy.
- **Tone keywords:** handmade · heartfelt · cozy · natural · one-of-a-kind ·
  loving · gentle · heirloom · storybook.
- **Don'ts:** hard sells, urgency/discount spam, corporate jargon.

---

## 9. Cheat sheet

```
WORDMARK   Zsuzsánna Hand-made          (Amatic SC, keep the á)
FONTS      Amatic SC (headings/nav) + Nunito (body)

COLOURS
  Background  #FFF9F1   warm linen white
  Primary     #586F6B   feldgrau green-grey   (white text)
  Secondary   #FCCEAF   soft peach            (black text)
  Heading     #000000   black
  Body        #2C2A24   warm near-black
  Muted       #6E6414   olive
  Accent      #B91C1C   heart red  (use sparingly)

SHAPE      rounded-lg (0.5rem) · wide whitespace · centered
MOTION     soft fades, opacity-drop hovers
PHOTOS     natural light · earthy/muted · doll is the hero · 3:4 portrait
VOICE      warm · first-person · heartfelt · handmade · never salesy
SOCIAL     @mesehely (Instagram & Facebook)
CURRENCY   Euro, suffix form: 120€
```

*Single source of truth for values: `src/styles/tokens.css` + `src/styles/fonts.css`.*
