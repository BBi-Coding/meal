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
      "shopping.both.title": "Both together (Brajan + Abigail, 1 week)",
      "shopping.both.note": "If you shop together, this is a rough guide for 7 days of dinners + next-day work meals + simple snacks for both of you.",
      "shopping.both.protein": "Protein: ~3.5–4.0 kg chicken/turkey, ~2.0–2.5 kg lean mince, ~1.0–1.2 kg salmon, 40–50 eggs, ~6–8 kg Skyr/Quark.",
      "shopping.both.carbs": "Carbs: ~2.0–2.5 kg oats, ~2.5–3.5 kg rice (or microwave rice), ~8–12 kg potatoes, 5–8 packs rice cakes, ~25–30 pieces fruit, ~2.5–4.5 kg frozen berries.",
      "shopping.both.fats": "Fats/extras: 1–2 bottles olive oil, 2 jars peanut butter, ~0.5–1.0 kg nuts.",
      "shopping.both.veg": "Vegetables: ~4–6 kg frozen veg mix and aim ~0.5–0.6 kg fresh veg per day together (~3.5–4.0 kg/week).",
      "rules.title": "Weekly adjustment rules (the key to gaining)",
      "rules.footer": "This is a template. Your real “maintenance” can vary—weekly trend adjustment is what makes it work.",

      // Shopping items (Brajan) — 7 dinners × 2 portions + snacks
      "shopping.item.b_p1": "Chicken breast / turkey (for dinners + next-day work meals)",
      "shopping.qty.b_p1": "~2.0–2.5 kg raw (7 dinners × 2 portions)",
      "shopping.item.b_p2": "Lean mince (beef or turkey) for mince dinners",
      "shopping.qty.b_p2": "~1.2–1.5 kg (covers 2–3 mince dinners × 2 portions)",
      "shopping.item.b_p3": "Salmon (optional but recommended)",
      "shopping.qty.b_p3": "~0.5–0.7 kg (for 1–2 salmon dinners × 2 portions)",
      "shopping.item.b_p4": "Eggs",
      "shopping.qty.b_p4": "24–30",
      "shopping.item.b_p5": "Skyr/Quark (laktosefrei) for simple snacks",
      "shopping.qty.b_p5": "~3.5–5.0 kg total (most days as snack)",
      "shopping.item.b_p6": "Protein powder (whey isolate / lactose-free) (optional)",
      "shopping.qty.b_p6": "0–1 shakes/day",
      "shopping.item.b_c1": "Oats (Haferflocken) for snacks / adjustments",
      "shopping.qty.b_c1": "~1.0–1.5 kg (no separate breakfast, mostly snacks)",
      "shopping.item.b_c2": "Rice (dry) / microwave rice for main dinners",
      "shopping.qty.b_c2": "~1.5–2.0 kg dry (or rice packs) for 3–4 rice dinners × 2 portions",
      "shopping.item.b_c3": "Potatoes for potato-based dinners",
      "shopping.qty.b_c3": "~5–7 kg (several dinners × 2 portions)",
      "shopping.item.b_c4": "Rice cakes",
      "shopping.qty.b_c4": "3–5 packs",
      "shopping.item.b_c5": "Bananas and other fruit",
      "shopping.qty.b_c5": "14–18 pieces total (for snacks / shakes)",
      "shopping.item.b_c6": "Frozen berries (for Skyr snacks)",
      "shopping.qty.b_c6": "~1.5–2.5 kg",
      "shopping.item.b_c7": "Honey / jam",
      "shopping.qty.b_c7": "1 jar",
      "shopping.item.b_f1": "Olive oil",
      "shopping.qty.b_f1": "1 bottle",
      "shopping.item.b_f2": "Peanut butter",
      "shopping.qty.b_f2": "1 jar",
      "shopping.item.b_f3": "Nuts (if tolerated) for snacks",
      "shopping.qty.b_f3": "300–500 g",
      "shopping.item.b_v1": "Frozen vegetable mix for dinners",
      "shopping.qty.b_v1": "~2–3 kg (to pair with rice/potato dinners × 2 portions)",
      "shopping.item.b_v2": "Fresh salad + tomatoes/cucumber",
      "shopping.qty.b_v2": "Aim ~300 g/day (for dinner + lunch box)",
      "shopping.item.b_v3": "Optional: onions/garlic/spices",
      "shopping.qty.b_v3": "for easy flavor",

      // Shopping items (Abigail) — scaled for her targets
      "shopping.item.a_p1": "Chicken breast / turkey (for dinners + next-day work meals)",
      "shopping.qty.a_p1": "~1.2–1.6 kg raw (scaled 7 dinners × 2 portions)",
      "shopping.item.a_p2": "Lean mince (beef or turkey) for mince dinners",
      "shopping.qty.a_p2": "~0.7–1.0 kg (2–3 dinners × 2 portions)",
      "shopping.item.a_p3": "Salmon (optional)",
      "shopping.qty.a_p3": "~0.3–0.5 kg (1–2 dinners × 2 portions)",
      "shopping.item.a_p4": "Eggs",
      "shopping.qty.a_p4": "14–20",
      "shopping.item.a_p5": "Skyr/Quark / yogurt for simple snacks",
      "shopping.qty.a_p5": "~2.0–3.0 kg total (most days as snack)",
      "shopping.item.a_p6": "Protein powder (optional)",
      "shopping.qty.a_p6": "only if needed",
      "shopping.item.a_c1": "Oats (Haferflocken) for snacks / adjustments",
      "shopping.qty.a_c1": "~0.7–1.0 kg (no separate breakfast, mostly snacks)",
      "shopping.item.a_c2": "Rice (dry) / microwave rice for main dinners",
      "shopping.qty.a_c2": "~0.9–1.3 kg dry (or rice packs) for 3–4 dinners × 2 portions",
      "shopping.item.a_c3": "Potatoes for potato-based dinners",
      "shopping.qty.a_c3": "~3–5 kg (several dinners × 2 portions)",
      "shopping.item.a_c4": "Rice cakes",
      "shopping.qty.a_c4": "2–3 packs",
      "shopping.item.a_c5": "Bananas and other fruit",
      "shopping.qty.a_c5": "10–14 pieces total (for snacks / shakes)",
      "shopping.item.a_c6": "Frozen berries (for Skyr snacks)",
      "shopping.qty.a_c6": "~1.0–2.0 kg",
      "shopping.item.a_c7": "Honey / jam",
      "shopping.qty.a_c7": "1 jar",
      "shopping.item.a_f1": "Olive oil",
      "shopping.qty.a_f1": "1 bottle",
      "shopping.item.a_f2": "Peanut butter",
      "shopping.qty.a_f2": "1 jar",
      "shopping.item.a_f3": "Nuts (optional) for snacks",
      "shopping.qty.a_f3": "200–400 g",
      "shopping.item.a_v1": "Frozen vegetable mix for dinners",
      "shopping.qty.a_v1": "~1.5–2.5 kg (to pair with rice/potato dinners × 2 portions)",
      "shopping.item.a_v2": "Fresh salad + tomatoes/cucumber",
      "shopping.qty.a_v2": "Aim ~250–300 g/day (for dinner + lunch box)",
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
      "shopping.both.title": "Beide zusammen (Brajan + Abigail, 1 Woche)",
      "shopping.both.note": "Wenn ihr gemeinsam einkauft, sind diese Mengen eine grobe Orientierung für 7 Tage Abendessen + Arbeitsmahlzeiten am nächsten Tag + einfache Snacks für euch beide.",
      "shopping.both.protein": "Protein: ~3,5–4,0 kg Hähnchen/Pute, ~2,0–2,5 kg mageres Hack, ~1,0–1,2 kg Lachs, 40–50 Eier, ~6–8 kg Skyr/Quark.",
      "shopping.both.carbs": "Kohlenhydrate: ~2,0–2,5 kg Haferflocken, ~2,5–3,5 kg Reis (oder Mikrowellenreis), ~8–12 kg Kartoffeln, 5–8 Packungen Reiswaffeln, ~25–30 Stück Obst, ~2,5–4,5 kg TK-Beeren.",
      "shopping.both.fats": "Fette/Extras: 1–2 Flaschen Olivenöl, 2 Gläser Erdnussbutter, ~0,5–1,0 kg Nüsse.",
      "shopping.both.veg": "Gemüse: ~4–6 kg TK-Gemüsemix und zusammen ~0,5–0,6 kg frisches Gemüse pro Tag anpeilen (~3,5–4,0 kg/Woche).",
      "rules.title": "Wöchentliche Anpassungsregeln (der Schlüssel zum Zunehmen)",
      "rules.footer": "Das ist eine Vorlage. Dein echtes „Erhaltungsniveau“ kann variieren – die wöchentliche Trend-Anpassung macht’s zuverlässig.",

      // Shopping items (Brajan) — 7 Abendessen × 2 Portionen + Snacks
      "shopping.item.b_p1": "Hähnchenbrust / Pute (für Abendessen + Arbeitsmahlzeit am nächsten Tag)",
      "shopping.qty.b_p1": "~2,0–2,5 kg roh (7 Abendessen × 2 Portionen)",
      "shopping.item.b_p2": "Mageres Hack (Rind oder Pute) für Hack-Gerichte",
      "shopping.qty.b_p2": "~1,2–1,5 kg (reicht für 2–3 Hack-Abendessen × 2 Portionen)",
      "shopping.item.b_p3": "Lachs (optional, aber empfohlen)",
      "shopping.qty.b_p3": "~0,5–0,7 kg (für 1–2 Lachs-Abendessen × 2 Portionen)",
      "shopping.item.b_p4": "Eier",
      "shopping.qty.b_p4": "24–30",
      "shopping.item.b_p5": "Skyr/Quark (laktosefrei) für einfache Snacks",
      "shopping.qty.b_p5": "~3,5–5,0 kg gesamt (an den meisten Tagen als Snack)",
      "shopping.item.b_p6": "Proteinpulver (Whey Isolat / laktosefrei) (optional)",
      "shopping.qty.b_p6": "0–1 Shakes/Tag",
      "shopping.item.b_c1": "Haferflocken für Snacks / Anpassungen",
      "shopping.qty.b_c1": "~1,0–1,5 kg (kein separates Frühstück, hauptsächlich Snacks)",
      "shopping.item.b_c2": "Reis (trocken) / Mikrowellenreis für Haupt-Abendessen",
      "shopping.qty.b_c2": "~1,5–2,0 kg trocken (oder Reispacks) für 3–4 Reis-Abendessen × 2 Portionen",
      "shopping.item.b_c3": "Kartoffeln für kartoffelbasierte Abendessen",
      "shopping.qty.b_c3": "~5–7 kg (mehrere Abendessen × 2 Portionen)",
      "shopping.item.b_c4": "Reiswaffeln",
      "shopping.qty.b_c4": "3–5 Packungen",
      "shopping.item.b_c5": "Bananen und anderes Obst",
      "shopping.qty.b_c5": "14–18 Stück gesamt (für Snacks / Shakes)",
      "shopping.item.b_c6": "TK-Beeren (für Skyr-Snacks)",
      "shopping.qty.b_c6": "~1,5–2,5 kg",
      "shopping.item.b_c7": "Honig / Marmelade",
      "shopping.qty.b_c7": "1 Glas",
      "shopping.item.b_f1": "Olivenöl",
      "shopping.qty.b_f1": "1 Flasche",
      "shopping.item.b_f2": "Erdnussbutter",
      "shopping.qty.b_f2": "1 Glas",
      "shopping.item.b_f3": "Nüsse (wenn verträglich) für Snacks",
      "shopping.qty.b_f3": "300–500 g",
      "shopping.item.b_v1": "TK-Gemüsemix für Abendessen",
      "shopping.qty.b_v1": "~2–3 kg (zu Reis-/Kartoffel-Abendessen × 2 Portionen)",
      "shopping.item.b_v2": "Salat + Tomaten/Gurke",
      "shopping.qty.b_v2": "Ziel ~300 g/Tag (für Abendessen + Lunchbox)",
      "shopping.item.b_v3": "Optional: Zwiebeln/Knoblauch/Gewürze",
      "shopping.qty.b_v3": "für einfachen Geschmack",

      // Shopping items (Abigail) — skaliert für ihr Ziel
      "shopping.item.a_p1": "Hähnchenbrust / Pute (für Abendessen + Arbeitsmahlzeit am nächsten Tag)",
      "shopping.qty.a_p1": "~1,2–1,6 kg roh (skaliert für 7 Abendessen × 2 Portionen)",
      "shopping.item.a_p2": "Mageres Hack (Rind oder Pute) für Hack-Gerichte",
      "shopping.qty.a_p2": "~0,7–1,0 kg (2–3 Abendessen × 2 Portionen)",
      "shopping.item.a_p3": "Lachs (optional)",
      "shopping.qty.a_p3": "~0,3–0,5 kg (für 1–2 Abendessen × 2 Portionen)",
      "shopping.item.a_p4": "Eier",
      "shopping.qty.a_p4": "14–20",
      "shopping.item.a_p5": "Skyr/Quark / Joghurt für einfache Snacks",
      "shopping.qty.a_p5": "~2,0–3,0 kg gesamt (an den meisten Tagen als Snack)",
      "shopping.item.a_p6": "Proteinpulver (optional)",
      "shopping.qty.a_p6": "nur bei Bedarf",
      "shopping.item.a_c1": "Haferflocken für Snacks / Anpassungen",
      "shopping.qty.a_c1": "~0,7–1,0 kg (kein separates Frühstück, hauptsächlich Snacks)",
      "shopping.item.a_c2": "Reis (trocken) / Mikrowellenreis für Haupt-Abendessen",
      "shopping.qty.a_c2": "~0,9–1,3 kg trocken (oder Reispacks) für 3–4 Abendessen × 2 Portionen",
      "shopping.item.a_c3": "Kartoffeln für kartoffelbasierte Abendessen",
      "shopping.qty.a_c3": "~3–5 kg (mehrere Abendessen × 2 Portionen)",
      "shopping.item.a_c4": "Reiswaffeln",
      "shopping.qty.a_c4": "2–3 Packungen",
      "shopping.item.a_c5": "Bananen und anderes Obst",
      "shopping.qty.a_c5": "10–14 Stück gesamt (für Snacks / Shakes)",
      "shopping.item.a_c6": "TK-Beeren (für Skyr-Snacks)",
      "shopping.qty.a_c6": "~1,0–2,0 kg",
      "shopping.item.a_c7": "Honig / Marmelade",
      "shopping.qty.a_c7": "1 Glas",
      "shopping.item.a_f1": "Olivenöl",
      "shopping.qty.a_f1": "1 Flasche",
      "shopping.item.a_f2": "Erdnussbutter",
      "shopping.qty.a_f2": "1 Glas",
      "shopping.item.a_f3": "Nüsse (optional) für Snacks",
      "shopping.qty.a_f3": "200–400 g",
      "shopping.item.a_v1": "TK-Gemüsemix für Abendessen",
      "shopping.qty.a_v1": "~1,5–2,5 kg (zu Reis-/Kartoffel-Abendessen × 2 Portionen)",
      "shopping.item.a_v2": "Salat + Tomaten/Gurke",
      "shopping.qty.a_v2": "Ziel ~250–300 g/Tag (für Abendessen + Lunchbox)",
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

    const targets = Array.from(root.querySelectorAll("summary strong, summary span, h4, p.muted, li"));
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
        // Common phrases for the new routine (full sentences/headlines)
        .replace(/You cook dinner once, eat it at home and save the second portion as tomorrow’s work meal\./g,
          "Du kochst das Abendessen einmal, isst es zu Hause und hebst die zweite Portion als Arbeitsmahlzeit für morgen auf.")
        .replace(/Cook once, eat twice: dinner \+ tomorrow’s work meal/gi,
          "Einmal kochen, zweimal essen: Abendessen + Arbeitsmahlzeit für morgen")
        .replace(/Choose dinners you liked and keep the cook-once-eat-twice system/gi,
          "Wähle Lieblings-Abendessen und behalte das „einmal kochen, zweimal essen“-System bei")
        .replace(/Repeat what she likes most • keep the cook-once-eat-twice system/gi,
          "Wiederhole, was sie am liebsten isst • behalte das „einmal kochen, zweimal essen“-System bei")
        .replace(/Work meal —/g, "Arbeitsmahlzeit —")
        .replace(/Simple snack —/g, "Einfacher Snack —")
        .replace(/Simple snack \+ add-ons/gi, "Einfacher Snack + Extras")
        .replace(/\(from yesterday’s dinner\)/g, "(vom gestrigen Abendessen)")
        .replace(/\(cook 2 portions\)/g, "(2 Portionen kochen)")
        .replace(/from Day (\d+) dinner/gi, "vom Tag-$1-Abendessen")
        .replace(/from Day (\d+) (?:dinner|Abendessen)/gi, "vom Tag-$1-Abendessen")
        .replace(/Yesterday’s dinner/gi, "gestriges Abendessen")
        .replace(/1 portion of yesterday’s (.+?) from the fridge\./g,
          "1 Portion der gestrigen $1 aus dem Kühlschrank.")
        .replace(/1 portion of (.+?) cooked on Day (\d+)\./g,
          "1 Portion von $1, gekocht an Tag $2.")
        .replace(/Rough guide for 1 portion:/g, "Grobe Orientierung für 1 Portion:")
        .replace(/If this is your very first day on the plan, just use the same chicken rice bowl you cook for dinner below and pack half for work\./g,
          "Wenn das dein erster Tag mit diesem Plan ist, benutze einfach dieselbe Hähnchen-Reis-Schüssel, die du unten fürs Abendessen kochst, und packe die Hälfte für die Arbeit ein.")
        .replace(/Eat one portion for dinner, cool the second portion and store it (in a box )?for tomorrow’s work meal\./g,
          "Iss eine Portion zum Abendessen, lass die zweite abkühlen und bewahre sie in einer Dose als Arbeitsmahlzeit für morgen auf.")
        .replace(/Cook it as 2 portions: 1 for tonight, 1 for tomorrow’s work meal when you start the rotation again\./g,
          "Koche das Gericht als 2 Portionen: 1 für heute Abend, 1 als Arbeitsmahlzeit für morgen, wenn du die Rotation neu startest.")
        .replace(/Keep protein high \(~200 g\/day\) and use rice\/potatoes\/oats as main carbs\./g,
          "Halte das Protein hoch (~200 g\/Tag) und nutze Reis\/Kartoffeln\/Haferflocken als Haupt-Kohlenhydrate.")
        .replace(/Protein: aim ~110–130 g\/day\./g,
          "Protein: Ziel ~110–130 g\/Tag.")
        .replace(/Calories: ~2300\/day \(add a snack if weight isn’t moving\)\./g,
          "Kalorien: ~2300\/Tag (füge einen Snack hinzu, wenn sich das Gewicht nicht bewegt).")
        // Dish names and combinations
        .replace(/Chicken rice bowl/gi, "Hähnchen-Reis-Schüssel")
        .replace(/Turkey rice bowl/gi, "Puten-Reis-Schüssel")
        .replace(/Turkey bowl/gi, "Puten-Bowl")
        .replace(/Salmon \+ potatoes/gi, "Lachs + Kartoffeln")
        .replace(/Mince rice bowl/gi, "Hack-Reis-Schüssel")
        .replace(/Ready rice \+ cooked protein/gi, "Fertiger Reis + gegartes Protein")
        .replace(/Ready rice \+ protein/gi, "Fertiger Reis + Protein")
        .replace(/Bigger chicken rice/gi, "Große Hähnchen-Reis-Portion")
        // Generic word swaps (keep after specific phrases)
        .replace(/\b7-day rotation\b/gi, "7-Tage-Rotation")
        .replace(/\b7-day rotation\b/gi, "7-Tage-Rotation")
        .replace(/\bDay\b/g, "Tag")
        .replace(/\bRough total:\b/g, "Grobe Summe:")
        .replace(/\bMeal\b/g, "Mahlzeit")
        .replace(/\bBreakfast\b/g, "Frühstück")
        .replace(/\bLunch\b/g, "Mittagessen")
        .replace(/\bDinner\b/g, "Abendessen")
        .replace(/\bEggs\b/g, "Eier")
        .replace(/\bOats\b/g, "Haferflocken")
        .replace(/\bChicken breast\b/g, "Hähnchenbrust")
        .replace(/\bChicken\b/g, "Hähnchen")
        .replace(/\bTurkey\b/g, "Pute")
        .replace(/\bRice\b/g, "Reis")
        .replace(/\bPotatoes\b/g, "Kartoffeln")
        .replace(/\bSalmon\b/g, "Lachs")
        .replace(/\bMince\b/g, "Hack")
        .replace(/\bFrozen berries\b/g, "TK-Beeren")
        .replace(/\bHoney\/jam\b/g, "Honig/Marmelade")
        .replace(/\bVeg\b/g, "Gemüse")
        .replace(/\bOlive oil\b/g, "Olivenöl")
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

