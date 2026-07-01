# Szerkesztési útmutató

Ez az útmutató neked szól, Zsuzsánna — nem kell hozzá programozói tudás. Ha
bármi nem egyértelmű, vagy elakadsz, írj bátran **[fejlesztő elérhetősége]**.

---

## 1. Bejelentkezés

A weboldal szerkesztő felülete itt érhető el:
**[ide kerül a weboldal címe]/admin**

Ezt a linket érdemes elmenteni a böngésződben (könyvjelző).

### Ha még nincs GitHub-fiókod

A bejelentkezéshez egy ingyenes GitHub-fiók kell (ez csak a belépéshez kell,
nem kell vele mást csinálnod).

1. Nyisd meg: [github.com/join](https://github.com/join)
2. Add meg az e-mail címed, adj meg egy jelszót és egy felhasználónevet.
3. Erősítsd meg az e-mail címed a kapott levélben.
4. Szólj a fejlesztőnek a felhasználóneveddel — ő hozzáad, hogy be tudj
   lépni a szerkesztőbe. Erről egy meghívó e-mailt fogsz kapni; abban
   fogadd el a meghívást.

### Belépés (ha már megvan a fiókod)

1. Nyisd meg a fenti admin linket.
2. Kattints a **"Login with GitHub"** gombra.
3. Jelentkezz be a GitHub-fiókoddal (ha még nem vagy bejelentkezve).
4. Első alkalommal a GitHub megkérdezi, hogy engedélyezed-e — kattints az
   **"Authorize"** gombra.

Ezután a böngésződ megjegyzi, hogy be vagy lépve — legközelebb csak az admin
linket kell megnyitnod.

---

## 2. Mit találsz a szerkesztőben

A bal oldali menüben három rész van:

| Rész | Mire való |
| :--- | :--- |
| **Dolls** | A babák — mindegyik automatikusan megjelenik a főoldalon. |
| **Pages** | A Kezdőlap, a Bemutatkozás és a Kapcsolat oldal szövege. |
| **Blog** | A blogbejegyzések (szöveg + képek). |

---

## 3. Új baba hozzáadása

1. Kattints a **Dolls** részre, majd a **"New Doll"** gombra.
2. Töltsd ki:
   - **Name** — a baba neve
   - **slug** — egy rövid, ékezet és szóköz nélküli azonosító (pl. `lilla-baba`)
   - **available** — pipáld be, ha kapható; vedd ki a pipát, ha elkelt
   - **price** — ár, pl. `120€` (kihagyható)
   - **description** — leírás magyarul és angolul
   - **cover** / **images** — töltsd fel a baba fotóit
3. Jobb fent kattints a **"Publish"** gombra.

Ennyi — a baba automatikusan megjelenik a főoldalon, és kap saját oldalt.

## 4. Baba megjelölése eladottként

Nyisd meg a babát a **Dolls** listában, vedd ki a pipát az **available**
mezőnél, majd **Publish**. A baba a listában marad, de "Elkelt" jelzéssel.

Ha teljesen el szeretnéd távolítani: nyisd meg a babát, és a jobb felső sarokban
lévő menüből válaszd a törlést.

---

## 5. A Kezdőlap / Bemutatkozás / Kapcsolat szövegének szerkesztése

Kattints a **Pages** részre, majd a szerkeszteni kívánt oldalra (**home**,
**about** vagy **contact**). Írd át a szöveget magyarul és angolul, majd
**Publish**.

---

## 6. Blog bejegyzés írása

1. Kattints a **Blog** részre, majd **"New Blog Post"**.
2. Töltsd ki a címet, egy rövid összefoglalót, a dátumot, és válaszd ki a
   nyelvet (magyar vagy angol).
3. Írd meg a bejegyzés szövegét, és tölts fel hozzá képeket.
4. **Publish**.

---

## 7. Mikor látszik élesben?

A **Publish** gombra kattintás után néhány percen belül automatikusan
megjelenik a változás a weboldalon — nem kell mást tenned.

---

Ha bármi nem működik úgy, ahogy vártad, nem tudsz belépni, vagy csak kérdésed
van — nyugodtan írj: **[fejlesztő elérhetősége]**.
