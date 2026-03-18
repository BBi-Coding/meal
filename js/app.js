(function () {
  const profileKey = "foodPlanProfile.v1";
  const checklistKeyPrefix = "foodPlanChecklist.v1";
  const languageKey = "foodPlanLanguage.v1";
  const allBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  const resetBtn = document.getElementById("resetList");
  const expandBtn = document.getElementById("expandAll");
  const btnBrajan = document.getElementById("profileBrajan");
  const btnAbigail = document.getElementById("profileAbigail");
  const btnLangEn = document.getElementById("langEn");
  const btnLangDe = document.getElementById("langDe");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const mainEl = document.querySelector("main");

  const I18N = {
    en: {
      "header.title": "Meal Plan (Germany)",
      "header.subtitle": "Choose a profile to see targets and portions.",
      "header.profileSelector": "Profile selector",
      "header.languageSelector": "Language selector",
      "nav.goal": "Goal",
      "nav.rotation": "Rotation",
      "nav.shopping": "Shopping",
      "nav.rules": "Rules",
      "goal.kicker": "Daily goal",
      "goal.targetsAria": "Targets",
      "goal.calories": "Calories",
      "goal.protein": "Protein",
      "goal.comfort": "Comfort",
      "goal.comfort.brajan": "moderate lactose/gluten",
      "goal.comfort.abigail": "no restrictions",
      "rotation.title": "7-day rotation (tap a day)",
      "rotation.note.b": "Keep lactose/gluten moderate by preferring <strong>rice/potatoes/oats</strong> and choosing <strong>laktosefrei</strong> dairy most days.",
      "rotation.note.a": "No restrictions. If appetite is low, add calories with easy carbs (rice/potatoes/oats) or a bit more oil/nuts.",
      "rotation.expandAll": "Expand all days",
      "rotation.collapseAll": "Collapse all days",
      "shopping.title": "Shopping list (1 week)",
      "shopping.tip": "Tip: the checklist saves automatically on this device (separately per profile).",
      "shopping.reset": "Reset checklist",
      "shopping.cat.protein": "Protein",
      "shopping.cat.carbs": "Carbs",
      "shopping.cat.fats": "Fats / extras",
      "shopping.cat.veg": "Vegetables",
      "shopping.swaps.title": "Cheaper swaps (Aldi/Lidl-friendly)",
      "shopping.swaps.1": "Chicken ↔ turkey ↔ lean (pork-free) mince",
      "shopping.swaps.2": "Rice ↔ potatoes ↔ oats",
      "shopping.swaps.3": "Fresh veg ↔ frozen veg (often cheaper + easier)",
      "rules.title": "Weekly adjustment rules (the key to gaining)",
      "rules.footer": "This is a template. Your real “maintenance” can vary—weekly trend adjustment is what makes it work.",

      // Shopping items (Brajan)
      "shopping.item.b_p1": "Chicken breast / turkey",
      "shopping.qty.b_p1": "~2.0–2.5 kg raw",
      "shopping.item.b_p2": "Lean mince (beef or turkey)",
      "shopping.qty.b_p2": "~1.2–1.5 kg",
      "shopping.item.b_p3": "Salmon (optional but recommended)",
      "shopping.qty.b_p3": "~0.5–0.7 kg",
      "shopping.item.b_p4": "Eggs",
      "shopping.qty.b_p4": "24–30",
      "shopping.item.b_p5": "Skyr/Quark (laktosefrei)",
      "shopping.qty.b_p5": "~3.5–5.0 kg total",
      "shopping.item.b_p6": "Protein powder (whey isolate / lactose-free) (optional)",
      "shopping.qty.b_p6": "0–1 shakes/day",
      "shopping.item.b_c1": "Oats (Haferflocken)",
      "shopping.qty.b_c1": "~1.0–1.5 kg",
      "shopping.item.b_c2": "Rice (dry) / microwave rice",
      "shopping.qty.b_c2": "~1.5–2.0 kg dry (or rice packs)",
      "shopping.item.b_c3": "Potatoes",
      "shopping.qty.b_c3": "~5–7 kg",
      "shopping.item.b_c4": "Rice cakes",
      "shopping.qty.b_c4": "3–5 packs",
      "shopping.item.b_c5": "Bananas",
      "shopping.qty.b_c5": "14–18",
      "shopping.item.b_c6": "Frozen berries",
      "shopping.qty.b_c6": "~1.5–2.5 kg",
      "shopping.item.b_c7": "Honey / jam",
      "shopping.qty.b_c7": "1 jar",
      "shopping.item.b_f1": "Olive oil",
      "shopping.qty.b_f1": "1 bottle",
      "shopping.item.b_f2": "Peanut butter",
      "shopping.qty.b_f2": "1 jar",
      "shopping.item.b_f3": "Nuts (if tolerated)",
      "shopping.qty.b_f3": "300–500 g",
      "shopping.item.b_v1": "Frozen vegetable mix",
      "shopping.qty.b_v1": "~2–3 kg",
      "shopping.item.b_v2": "Fresh salad + tomatoes/cucumber",
      "shopping.qty.b_v2": "Aim ~300 g/day",
      "shopping.item.b_v3": "Optional: onions/garlic/spices",
      "shopping.qty.b_v3": "for easy flavor",

      // Shopping items (Abigail)
      "shopping.item.a_p1": "Chicken breast / turkey",
      "shopping.qty.a_p1": "~1.2–1.6 kg raw",
      "shopping.item.a_p2": "Lean mince (beef or turkey)",
      "shopping.qty.a_p2": "~0.7–1.0 kg",
      "shopping.item.a_p3": "Salmon (optional)",
      "shopping.qty.a_p3": "~0.3–0.5 kg",
      "shopping.item.a_p4": "Eggs",
      "shopping.qty.a_p4": "14–20",
      "shopping.item.a_p5": "Skyr/Quark / yogurt",
      "shopping.qty.a_p5": "~2.0–3.0 kg total",
      "shopping.item.a_p6": "Protein powder (optional)",
      "shopping.qty.a_p6": "only if needed",
      "shopping.item.a_c1": "Oats (Haferflocken)",
      "shopping.qty.a_c1": "~0.7–1.0 kg",
      "shopping.item.a_c2": "Rice (dry) / microwave rice",
      "shopping.qty.a_c2": "~0.9–1.3 kg dry (or rice packs)",
      "shopping.item.a_c3": "Potatoes",
      "shopping.qty.a_c3": "~3–5 kg",
      "shopping.item.a_c4": "Rice cakes",
      "shopping.qty.a_c4": "2–3 packs",
      "shopping.item.a_c5": "Bananas",
      "shopping.qty.a_c5": "10–14",
      "shopping.item.a_c6": "Frozen berries",
      "shopping.qty.a_c6": "~1.0–2.0 kg",
      "shopping.item.a_c7": "Honey / jam",
      "shopping.qty.a_c7": "1 jar",
      "shopping.item.a_f1": "Olive oil",
      "shopping.qty.a_f1": "1 bottle",
      "shopping.item.a_f2": "Peanut butter",
      "shopping.qty.a_f2": "1 jar",
      "shopping.item.a_f3": "Nuts (optional)",
      "shopping.qty.a_f3": "200–400 g",
      "shopping.item.a_v1": "Frozen vegetable mix",
      "shopping.qty.a_v1": "~1.5–2.5 kg",
      "shopping.item.a_v2": "Fresh salad + tomatoes/cucumber",
      "shopping.qty.a_v2": "Aim ~250–300 g/day",
      "shopping.item.a_v3": "Optional: onions/garlic/spices",
      "shopping.qty.a_v3": "for easy flavor",

      // Rules (HTML keeps <strong>)
      "rules.b.1": "<strong>Weigh daily</strong> (morning, after bathroom). Use the <strong>7-day average</strong>.",
      "rules.b.2": "Target gain: <strong>0.25–0.5 kg/week</strong>.",
      "rules.b.3": "If your 7-day average is <strong>flat after 14 days</strong>: add <strong>+150–200 kcal/day</strong> (best: +50 g dry rice OR +60–80 g oats OR +300–400 g potatoes).",
      "rules.b.4": "If you gain <strong>&gt;0.6 kg/week</strong> for 2 weeks: remove <strong>~150–250 kcal/day</strong> (usually from fats: less oil/peanut butter/nuts).",
      "rules.b.5": "If digestion feels off: go <strong>laktosefrei</strong> only for dairy and reduce bread/pasta for a week (use rice/potatoes/oats instead).",
      "rules.a.1": "<strong>Weigh daily</strong> (morning, after bathroom). Use the <strong>7-day average</strong>.",
      "rules.a.2": "Target gain: <strong>0.2–0.4 kg/week</strong>.",
      "rules.a.3": "If your 7-day average is <strong>flat after 14 days</strong>: add <strong>+120–150 kcal/day</strong> (best: +30 g dry rice OR +40–60 g oats OR +200–300 g potatoes).",
      "rules.a.4": "If you gain <strong>&gt;0.5 kg/week</strong> for 2 weeks: remove <strong>~120–150 kcal/day</strong> (usually from fats).",
      "rules.a.5": "Lowest effort calorie boost: add <strong>10 g olive oil</strong> to meals or an extra snack."
    },
    de: {
      "header.title": "Essensplan (Deutschland)",
      "header.subtitle": "Wähle ein Profil, um Ziele und Portionen zu sehen.",
      "header.profileSelector": "Profil-Auswahl",
      "header.languageSelector": "Sprachwahl",
      "nav.goal": "Ziel",
      "nav.rotation": "Rotation",
      "nav.shopping": "Einkaufen",
      "nav.rules": "Regeln",
      "goal.kicker": "Tagesziel",
      "goal.targetsAria": "Ziele",
      "goal.calories": "Kalorien",
      "goal.protein": "Protein",
      "goal.comfort": "Verträglichkeit",
      "goal.comfort.brajan": "mäßig Laktose/Gluten",
      "goal.comfort.abigail": "keine Einschränkungen",
      "rotation.title": "7-Tage-Rotation (Tag antippen)",
      "rotation.note.b": "Halte Laktose/Gluten moderat, indem du <strong>Reis/Kartoffeln/Haferflocken</strong> bevorzugst und bei Milchprodukten meist <strong>laktosefrei</strong> wählst.",
      "rotation.note.a": "Keine Einschränkungen. Wenn der Appetit niedrig ist, füge Kalorien über einfache Kohlenhydrate (Reis/Kartoffeln/Haferflocken) oder etwas mehr Öl/Nüsse hinzu.",
      "rotation.expandAll": "Alle Tage ausklappen",
      "rotation.collapseAll": "Alle Tage einklappen",
      "shopping.title": "Einkaufsliste (1 Woche)",
      "shopping.tip": "Tipp: Die Checkliste speichert automatisch auf diesem Gerät (getrennt pro Profil).",
      "shopping.reset": "Checkliste zurücksetzen",
      "shopping.cat.protein": "Protein",
      "shopping.cat.carbs": "Kohlenhydrate",
      "shopping.cat.fats": "Fette / Extras",
      "shopping.cat.veg": "Gemüse",
      "shopping.swaps.title": "Günstigere Alternativen (Aldi/Lidl)",
      "shopping.swaps.1": "Hähnchen ↔ Pute ↔ mageres Hack (ohne Schwein)",
      "shopping.swaps.2": "Reis ↔ Kartoffeln ↔ Haferflocken",
      "shopping.swaps.3": "Frisches Gemüse ↔ TK-Gemüse (oft günstiger + einfacher)",
      "rules.title": "Wöchentliche Anpassungsregeln (der Schlüssel zum Zunehmen)",
      "rules.footer": "Das ist eine Vorlage. Dein echtes „Erhaltungsniveau“ kann variieren – die wöchentliche Trend-Anpassung macht’s zuverlässig.",

      // Shopping items (Brajan)
      "shopping.item.b_p1": "Hähnchenbrust / Pute",
      "shopping.qty.b_p1": "~2,0–2,5 kg roh",
      "shopping.item.b_p2": "Mageres Hack (Rind oder Pute)",
      "shopping.qty.b_p2": "~1,2–1,5 kg",
      "shopping.item.b_p3": "Lachs (optional, aber empfohlen)",
      "shopping.qty.b_p3": "~0,5–0,7 kg",
      "shopping.item.b_p4": "Eier",
      "shopping.qty.b_p4": "24–30",
      "shopping.item.b_p5": "Skyr/Quark (laktosefrei)",
      "shopping.qty.b_p5": "~3,5–5,0 kg gesamt",
      "shopping.item.b_p6": "Proteinpulver (Whey Isolat / laktosefrei) (optional)",
      "shopping.qty.b_p6": "0–1 Shakes/Tag",
      "shopping.item.b_c1": "Haferflocken",
      "shopping.qty.b_c1": "~1,0–1,5 kg",
      "shopping.item.b_c2": "Reis (trocken) / Mikrowellenreis",
      "shopping.qty.b_c2": "~1,5–2,0 kg trocken (oder Reispacks)",
      "shopping.item.b_c3": "Kartoffeln",
      "shopping.qty.b_c3": "~5–7 kg",
      "shopping.item.b_c4": "Reiswaffeln",
      "shopping.qty.b_c4": "3–5 Packungen",
      "shopping.item.b_c5": "Bananen",
      "shopping.qty.b_c5": "14–18",
      "shopping.item.b_c6": "TK-Beeren",
      "shopping.qty.b_c6": "~1,5–2,5 kg",
      "shopping.item.b_c7": "Honig / Marmelade",
      "shopping.qty.b_c7": "1 Glas",
      "shopping.item.b_f1": "Olivenöl",
      "shopping.qty.b_f1": "1 Flasche",
      "shopping.item.b_f2": "Erdnussbutter",
      "shopping.qty.b_f2": "1 Glas",
      "shopping.item.b_f3": "Nüsse (wenn verträglich)",
      "shopping.qty.b_f3": "300–500 g",
      "shopping.item.b_v1": "TK-Gemüsemix",
      "shopping.qty.b_v1": "~2–3 kg",
      "shopping.item.b_v2": "Salat + Tomaten/Gurke",
      "shopping.qty.b_v2": "Ziel ~300 g/Tag",
      "shopping.item.b_v3": "Optional: Zwiebeln/Knoblauch/Gewürze",
      "shopping.qty.b_v3": "für einfachen Geschmack",

      // Shopping items (Abigail)
      "shopping.item.a_p1": "Hähnchenbrust / Pute",
      "shopping.qty.a_p1": "~1,2–1,6 kg roh",
      "shopping.item.a_p2": "Mageres Hack (Rind oder Pute)",
      "shopping.qty.a_p2": "~0,7–1,0 kg",
      "shopping.item.a_p3": "Lachs (optional)",
      "shopping.qty.a_p3": "~0,3–0,5 kg",
      "shopping.item.a_p4": "Eier",
      "shopping.qty.a_p4": "14–20",
      "shopping.item.a_p5": "Skyr/Quark / Joghurt",
      "shopping.qty.a_p5": "~2,0–3,0 kg gesamt",
      "shopping.item.a_p6": "Proteinpulver (optional)",
      "shopping.qty.a_p6": "nur bei Bedarf",
      "shopping.item.a_c1": "Haferflocken",
      "shopping.qty.a_c1": "~0,7–1,0 kg",
      "shopping.item.a_c2": "Reis (trocken) / Mikrowellenreis",
      "shopping.qty.a_c2": "~0,9–1,3 kg trocken (oder Reispacks)",
      "shopping.item.a_c3": "Kartoffeln",
      "shopping.qty.a_c3": "~3–5 kg",
      "shopping.item.a_c4": "Reiswaffeln",
      "shopping.qty.a_c4": "2–3 Packungen",
      "shopping.item.a_c5": "Bananen",
      "shopping.qty.a_c5": "10–14",
      "shopping.item.a_c6": "TK-Beeren",
      "shopping.qty.a_c6": "~1,0–2,0 kg",
      "shopping.item.a_c7": "Honig / Marmelade",
      "shopping.qty.a_c7": "1 Glas",
      "shopping.item.a_f1": "Olivenöl",
      "shopping.qty.a_f1": "1 Flasche",
      "shopping.item.a_f2": "Erdnussbutter",
      "shopping.qty.a_f2": "1 Glas",
      "shopping.item.a_f3": "Nüsse (optional)",
      "shopping.qty.a_f3": "200–400 g",
      "shopping.item.a_v1": "TK-Gemüsemix",
      "shopping.qty.a_v1": "~1,5–2,5 kg",
      "shopping.item.a_v2": "Salat + Tomaten/Gurke",
      "shopping.qty.a_v2": "Ziel ~250–300 g/Tag",
      "shopping.item.a_v3": "Optional: Zwiebeln/Knoblauch/Gewürze",
      "shopping.qty.a_v3": "für einfachen Geschmack",

      // Rules (HTML keeps <strong>)
      "rules.b.1": "<strong>Täglich wiegen</strong> (morgens, nach dem Bad). Nutze den <strong>7-Tage-Durchschnitt</strong>.",
      "rules.b.2": "Ziel-Zunahme: <strong>0,25–0,5 kg/Woche</strong>.",
      "rules.b.3": "Wenn dein 7-Tage-Durchschnitt <strong>nach 14 Tagen flach</strong> ist: <strong>+150–200 kcal/Tag</strong> hinzufügen (am besten: +50 g trockener Reis ODER +60–80 g Haferflocken ODER +300–400 g Kartoffeln).",
      "rules.b.4": "Wenn du <strong>&gt;0,6 kg/Woche</strong> für 2 Wochen zunimmst: <strong>~150–250 kcal/Tag</strong> entfernen (meist aus Fetten: weniger Öl/Erdnussbutter/Nüsse).",
      "rules.b.5": "Wenn die Verdauung komisch ist: bei Milchprodukten nur <strong>laktosefrei</strong> und 1 Woche weniger Brot/Nudeln (stattdessen Reis/Kartoffeln/Haferflocken).",
      "rules.a.1": "<strong>Täglich wiegen</strong> (morgens, nach dem Bad). Nutze den <strong>7-Tage-Durchschnitt</strong>.",
      "rules.a.2": "Ziel-Zunahme: <strong>0,2–0,4 kg/Woche</strong>.",
      "rules.a.3": "Wenn dein 7-Tage-Durchschnitt <strong>nach 14 Tagen flach</strong> ist: <strong>+120–150 kcal/Tag</strong> hinzufügen (am besten: +30 g trockener Reis ODER +40–60 g Haferflocken ODER +200–300 g Kartoffeln).",
      "rules.a.4": "Wenn du <strong>&gt;0,5 kg/Woche</strong> für 2 Wochen zunimmst: <strong>~120–150 kcal/Tag</strong> entfernen (meist aus Fetten).",
      "rules.a.5": "Einfachster Kalorien-Boost: <strong>10 g Olivenöl</strong> zu Mahlzeiten oder ein extra Snack."
    }
  };

  function t(lang, key) {
    return I18N?.[lang]?.[key] ?? I18N?.en?.[key] ?? null;
  }

  function getActiveLanguage() {
    try {
      const l = localStorage.getItem(languageKey);
      if (l === "en" || l === "de") return l;
    } catch (_) {}
    return "en";
  }

  function applyAutoTranslations(lang) {
    const root = document.getElementById("rotation");
    if (!root) return;

    const targets = Array.from(root.querySelectorAll("summary strong, summary span, h4, p.muted"));
    targets.forEach(el => {
      if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-html")) return;
      const stored = el.getAttribute("data-i18n-source");
      if (!stored) el.setAttribute("data-i18n-source", el.textContent || "");
      const base = el.getAttribute("data-i18n-source") || "";

      if (lang !== "de") {
        el.textContent = base;
        return;
      }

      const x = base
        .replace(/\b7-day rotation\b/gi, "7-Tage-Rotation")
        .replace(/\bDay\b/g, "Tag")
        .replace(/\bRough total:\b/g, "Grobe Summe:")
        .replace(/\bMeal\b/g, "Mahlzeit")
        .replace(/\bBreakfast\b/g, "Frühstück")
        .replace(/\bLunch\b/g, "Mittagessen")
        .replace(/\bDinner\b/g, "Abendessen")
        .replace(/\bEggs\b/g, "Eier")
        .replace(/\bOats\b/g, "Haferflocken")
        .replace(/\bChicken\b/g, "Hähnchen")
        .replace(/\bTurkey\b/g, "Pute")
        .replace(/\bRice\b/g, "Reis")
        .replace(/\bPotatoes\b/g, "Kartoffeln")
        .replace(/\bSalmon\b/g, "Lachs")
        .replace(/\bMince\b/g, "Hack")
        .replace(/\boptional\b/gi, "optional");
      el.textContent = x;
    });
  }

  function applyTranslations(lang) {
    const list = Array.from(document.querySelectorAll("[data-i18n]"));
    list.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = t(lang, key);
      if (typeof val === "string") el.textContent = val;
    });

    const listHtml = Array.from(document.querySelectorAll("[data-i18n-html]"));
    listHtml.forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      if (!key) return;
      const val = t(lang, key);
      if (typeof val === "string") el.innerHTML = val;
    });

    const listAria = Array.from(document.querySelectorAll("[data-i18n-aria-label]"));
    listAria.forEach(el => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (!key) return;
      const val = t(lang, key);
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });

    try {
      document.documentElement.lang = lang;
    } catch (_) {}

    applyAutoTranslations(lang);
  }

  function setActiveLanguage(lang) {
    if (lang !== "en" && lang !== "de") lang = "en";
    try { localStorage.setItem(languageKey, lang); } catch (_) {}

    if (btnLangEn) btnLangEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    if (btnLangDe) btnLangDe.setAttribute("aria-pressed", lang === "de" ? "true" : "false");

    applyTranslations(lang);
    // Re-apply dynamic labels that depend on profile/language
    setActiveProfile(getActiveProfile());
  }

  function getActiveProfile() {
    try {
      const p = localStorage.getItem(profileKey);
      if (p === "abigail" || p === "brajan") return p;
    } catch (_) {}
    return "brajan";
  }

  function setActiveProfile(profile) {
    try { localStorage.setItem(profileKey, profile); } catch (_) {}
    const lang = getActiveLanguage();

    const sections = Array.from(document.querySelectorAll(".profileOnly"));
    sections.forEach(s => {
      const p = s.getAttribute("data-profile");
      s.classList.toggle("active", p === profile);
    });

    if (btnBrajan) btnBrajan.setAttribute("aria-pressed", profile === "brajan" ? "true" : "false");
    if (btnAbigail) btnAbigail.setAttribute("aria-pressed", profile === "abigail" ? "true" : "false");

    if (pageTitle) {
      pageTitle.textContent = profile === "abigail"
        ? (lang === "de" ? "Essensplan — Abigail" : "Meal Plan — Abigail")
        : (lang === "de" ? "Essensplan — Brajan" : "Meal Plan — Brajan");
    }
    if (pageSubtitle) {
      pageSubtitle.textContent = profile === "abigail"
        ? (lang === "de"
          ? "~2300 kcal/Tag • ~110–130 g Protein/Tag • zunehmen"
          : "~2300 kcal/day • ~110–130 g protein/day • gain weight")
        : (lang === "de"
          ? "~3700 kcal/Tag • viel Protein • mäßig Laktose/Gluten"
          : "~3700 kcal/day • high-protein • moderate lactose/gluten");
    }

    updateExpandButtonLabel();
    loadState(profile);
  }

  function getChecklistStorageKey(profile) { return `${checklistKeyPrefix}.${profile}`; }

  function getVisibleDayDetails() {
    const profile = getActiveProfile();
    const container = document.querySelector(`.days.profileOnly[data-profile=\"${profile}\"]`);
    if (!container) return [];
    return Array.from(container.querySelectorAll("details.day"));
  }

  function getVisibleChecklistBoxes(profile) {
    const container = document.querySelector(`.shopGrid.profileOnly[data-profile=\"${profile}\"]`);
    if (!container) return [];
    return Array.from(container.querySelectorAll('input[type="checkbox"]'));
  }

  function applyDoneClass(box) {
    const row = box.closest(".item");
    if (!row) return;
    row.classList.toggle("done", box.checked);
  }

  function loadState(profile) {
    try {
      const raw = localStorage.getItem(getChecklistStorageKey(profile));
      const state = raw ? JSON.parse(raw) : {};
      const visible = getVisibleChecklistBoxes(profile);
      visible.forEach(b => {
        b.checked = !!state[b.id];
        applyDoneClass(b);
      });
    } catch (_) {}
  }

  function saveState(profile) {
    try {
      const state = {};
      const visible = getVisibleChecklistBoxes(profile);
      visible.forEach(b => state[b.id] = !!b.checked);
      localStorage.setItem(getChecklistStorageKey(profile), JSON.stringify(state));
    } catch (_) {}
  }

  allBoxes.forEach(b => {
    b.addEventListener("change", () => {
      applyDoneClass(b);
      const container = b.closest(".shopGrid.profileOnly");
      const profile = container?.getAttribute("data-profile") || getActiveProfile();
      saveState(profile);
    });
  });

  resetBtn?.addEventListener("click", () => {
    const profile = getActiveProfile();
    const visible = getVisibleChecklistBoxes(profile);
    visible.forEach(b => {
      b.checked = false;
      applyDoneClass(b);
    });
    try { localStorage.removeItem(getChecklistStorageKey(profile)); } catch (_) {}
  });

  function updateExpandButtonLabel() {
    const visible = getVisibleDayDetails();
    if (!expandBtn || visible.length === 0) return;
    const allOpen = visible.every(d => d.open);
    const lang = getActiveLanguage();
    expandBtn.textContent = allOpen ? (t(lang, "rotation.collapseAll") || "Collapse all days") : (t(lang, "rotation.expandAll") || "Expand all days");
  }

  expandBtn?.addEventListener("click", () => {
    const visible = getVisibleDayDetails();
    if (visible.length === 0) return;
    const allOpen = visible.every(d => d.open);
    visible.forEach(d => d.open = !allOpen);
    updateExpandButtonLabel();
  });

  btnBrajan?.addEventListener("click", () => setActiveProfile("brajan"));
  btnAbigail?.addEventListener("click", () => setActiveProfile("abigail"));

  btnLangEn?.addEventListener("click", () => setActiveLanguage("en"));
  btnLangDe?.addEventListener("click", () => setActiveLanguage("de"));

  // Init language first so first paint is correct.
  applyTranslations(getActiveLanguage());
  setActiveLanguage(getActiveLanguage());

  function syncHeaderSpacer() {
    try {
      const header = document.querySelector("header");
      if (!header || !mainEl) return;
      const h = header.getBoundingClientRect().height || 90;
      mainEl.style.paddingTop = `${Math.ceil(h + 14)}px`;
    } catch (_) {}
  }
  window.addEventListener("resize", syncHeaderSpacer, { passive: true });
  syncHeaderSpacer();
})();

