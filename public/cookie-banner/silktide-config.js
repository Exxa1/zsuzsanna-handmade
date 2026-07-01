// Silktide cookie-consent banner config (Hungarian).
//
// This site uses only privacy-friendly, cookieless analytics (GoatCounter), so
// the banner declares just the "necessary" cookie type. If you later add a
// tracker that sets cookies (e.g. a Meta Pixel for ads), add it back here as a
// new cookieType with an onAccept loader. See README "Élesítés / átállítás".

silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: true
  },
  cookieIcon: {
    position: "bottomLeft"
  },
  text: {
    banner: {
      description: '<p>Weboldalunk sütiket (cookie-kat) használhat a forgalom elemzése érdekében. További információkért olvassa el <a href="/footer/adatkezeles_tajekoztato" target="_blank">Adatkezelési Tájékoztatónkat.</a></p>',
      acceptAllButtonText: "Összes elfogadása",
      rejectNonEssentialButtonText: "Csak a szükségesek",
      preferencesButtonText: "Beállítások",
    },
    preferences: {
      title: "Sütibeállítások testreszabása",
      description: '<p>Tiszteletben tartjuk a magánszféráját. Ön dönthet arról, hogy mely sütik használatát engedélyezi weboldalunkon. További információkért olvassa el <a href="/footer/adatkezeles_tajekoztato" target="_blank">Adatkezelési Tájékoztatónkat.</a></p>',
    }
  },
  cookieTypes: [
    {
      id: "necessary",
      name: "Szükséges sütik",
      description: "<p>Ezek a sütik elengedhetetlenek a weboldal megfelelő működéséhez, ezért nem kapcsolhatók ki.</p>",
      required: true,
      onAccept: function() {
        // No action needed for necessary cookies.
      }
    }
  ]
});
