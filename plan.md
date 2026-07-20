# Plan – Phase 2: Frontend nach Webflow-Vorlage

## Ausgangslage

- **Phase 1 (fertig):** Payload CMS 3 + Next.js 15, deutsches Admin, Collections
  „Weine“, „Events“ (mit PDF), „Verleih“, Mediathek, Kontakt-Global. Deployment
  per Dockerfile auf Dokploy, Uploads unter `/app/uploads`.
- **Phase 2 (dieser Plan):** Frontend der Website nach der mit **Claude Design**
  erstellten und vom Kunden abgenommenen Vorlage bauen (CI: Lila `#6d4a7e` /
  Bronze `#a5793f`). Die Vorlage liegt im Repo unter `design-vorlage/`:
  `index.html` ist der Original-Export, `vorlage-startseite.html` die daraus
  extrahierte, lesbare Referenz (reine Referenz, nicht Teil des Builds).

## Oberste Regel: Die Vorlage ist das Gesetz

Das Design wird **1:1 aus der Webflow-Vorlage übernommen**, nicht interpretiert
oder „verbessert“. Konkret heißt das:

- **Farben:** Exakt die Farbwerte aus der Vorlage übernehmen (erstmal auch dann,
  wenn sie später noch angepasst werden sollen). Alle Farben aus der Webflow-CSS
  extrahieren und als CSS-Variablen anlegen – keine eigenen Farbtöne erfinden.
- **Fonts:** Dieselben Schriftarten, Schriftschnitte, Größen, Zeilenhöhen und
  Letter-Spacings wie in der Vorlage. Font-Dateien lokal ins Projekt legen
  (`next/font/local` bzw. `next/font/google`) – kein Laden von fremden CDNs zur
  Laufzeit.
- **Abstände:** Margins, Paddings, Gaps und Section-Abstände pixelgenau aus der
  Webflow-CSS übernehmen – auch die responsiven Werte je Breakpoint.
- **Rundungen:** Border-Radius-Werte exakt übernehmen (Buttons, Cards, Bilder).
- **Animationen:** Alle Animationen und Interaktionen der Vorlage nachbauen –
  Scroll-/Reveal-Effekte, Hover-Zustände, Transitions, ggf. Marquees oder
  Parallax. Timing, Easing und Delays so nah wie möglich am Original (Webflow
  IX2-Interaktionen in `webflow.js` analysieren und mit CSS-Transitions bzw.
  einer leichten Animationsbibliothek nachbilden).
- **Breakpoints:** Das responsive Verhalten der Vorlage übernehmen (Webflow-
  Standard: 991px, 767px, 478px), inklusive mobilem Menü.

Abweichungen von der Vorlage nur, wenn technisch zwingend nötig – und dann in
der PR/Commit-Message dokumentieren.

## Vorgehen

### 1. Vorlage analysieren

- HTML der Startseite lesen: Section-Struktur, Klassennamen, DOM-Aufbau.
- CSS der Vorlage auswerten: Farben, Fonts, Größen, Abstände, Radii,
  Breakpoints → als Design-Tokens (CSS-Variablen) in `src/app/(frontend)/`
  ablegen.
- Fonts aus dem Export extrahieren und lokal einbinden (`next/font/local`).
- Animationen übernehmen: Hero-Einblendung (`heroIn`, 1.1s,
  `cubic-bezier(0.22,1,0.36,1)`), Scroll-Reveal per IntersectionObserver
  (translateY(28px) → 0, 0.9s, threshold 0.12, Above-the-fold ausgenommen),
  alle Hover-Transitions.
- Bildflächen der Vorlage (Hero, Porträt) als gestaltete Platzhalter
  umsetzen, bis echte Fotos da sind.

### 2. Startseite bauen – alle Sections der Vorlage

**Jede** Section der Webflow-Startseite wird nachgebaut, in derselben
Reihenfolge, mit demselben Layout und denselben Animationen. Beim Umsetzen pro
Section prüfen: Desktop-Layout, Tablet, Mobile, Hover-Zustände, Animationen.

Statische Texte der Vorlage bleiben zunächst Platzhalter; wo es inhaltlich
passt, werden Sections an die CMS-Inhalte angebunden:

| Vorlage-Section | Datenquelle |
| --- | --- |
| Hero, Über/Intro, sonstige statische Sections | statisch (Phase 3: ggf. CMS) |
| Wein-/Produkt-Grid | Collection `weine` |
| Events/Termine | Collection `events` (nur zukünftige, inkl. PDF-Link) |
| Verleih/Angebote | Collection `verleih` |
| Kontakt/Footer | Global `kontakt` |

### 3. Technische Leitplanken

- Frontend lebt in `src/app/(frontend)/` – Server Components, Daten direkt über
  die Payload Local API (`getPayload`), kein Client-Fetch für Inhalte.
- Bilder über `next/image` mit den in `Media.ts` definierten Größen
  (thumbnail/card/hero).
- Webflow-HTML dient als Referenz, wird aber **nicht** 1:1 samt `webflow.js`
  eingebunden – die Seite wird als sauberes Next.js/React nachgebaut, nur das
  visuelle Ergebnis muss identisch sein.
- Der Ordner `design-vorlage/` ist reine Referenz: von Build, Lint und
  TypeScript ausgeschlossen.
- Nach jeder Section: visueller Abgleich gegen die Vorlage (Screenshot
  Original vs. Nachbau, Desktop + Mobile).

### 4. Abschluss Phase 2

- Alle Sections der Startseite stehen und sind responsiv + animiert wie die
  Vorlage.
- Build (`npm run build`) läuft fehlerfrei; Deployment auf Dokploy unverändert
  über das bestehende Dockerfile.
- Danach (Phase 3): Unterseiten (falls in der Vorlage vorhanden), Feinschliff,
  echte Inhalte, SEO/Meta, Ersatz der Template-Bilder.
