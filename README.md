# Weinmacher Mühltal – Website & CMS

Website mit integriertem CMS für den Weinmacher Mühltal. Gebaut mit **Next.js 15 + Payload CMS 3** – Frontend und Admin-Bereich laufen als eine einzige App.

## Was der Kunde pflegen kann

Login unter `https://<domain>/admin` (deutsches Admin-Panel):

| Bereich | Inhalt |
| --- | --- |
| **Weine** | Name, Weinart, Jahrgang, Beschreibung, Preis, Flaschenbild, „ausverkauft“-Schalter. Reihenfolge per Drag & Drop. |
| **Events** | Titel, Datum/Uhrzeit, Ort, Beschreibung, Bild, **PDF-Upload** (Programm/Einladung), Anmelde-Link, „ausgebucht“-Schalter. |
| **Verleih** | Ausschankwagen & Technik: Name, Kategorie, Beschreibung, Preis-Info, mehrere Bilder, „verfügbar“-Schalter. |
| **Bilder / Dokumente** | Zentrale Mediathek für Fotos und PDFs. |
| **Kontakt & Adresse** | Kontaktdaten, Öffnungszeiten, Social-Media-Links. |

## Lokale Entwicklung

Voraussetzungen: Node 20+, Docker (für Postgres).

```bash
docker compose up -d        # startet Postgres auf localhost:5432
cp .env.example .env        # DATABASE_URL passt bereits, PAYLOAD_SECRET setzen
npm install
npm run dev                 # http://localhost:3000, Admin: /admin
```

Beim ersten Aufruf von `/admin` wird der erste Benutzer angelegt. Das Datenbank-Schema legt Payload im Dev-Modus automatisch an.

## Deployment auf Dokploy (Hetzner)

### 1. Postgres-Service anlegen

In Dokploy: **Create Service → Database → PostgreSQL** (z. B. Name `weinmacher-db`, Datenbank `weinmacher`). Die interne Connection-String notieren – Hostname ist der Dokploy-interne Service-Name.

### 2. App anlegen

**Create Service → Application**, GitHub-Repo verbinden, Branch wählen. Build-Typ: **Dockerfile** (liegt im Repo-Root, nutzt Next.js Standalone-Output).

Environment-Variablen setzen:

```
DATABASE_URL=postgres://<user>:<pass>@<interner-db-host>:5432/weinmacher
PAYLOAD_SECRET=<openssl rand -hex 32>
```

### 3. Volume für Uploads mounten

Die App speichert Bilder und PDFs im Dateisystem unter `/app/uploads`. In Dokploy unter **Advanced → Volumes** ein Volume-Mount anlegen:

- Mount-Typ: **Volume**
- Name: z. B. `weinmacher-uploads`
- Mount Path: `/app/uploads`

Ohne dieses Volume gehen alle Uploads bei jedem Deployment verloren!

### 4. Domain & SSL

Unter **Domains** die Domain eintragen (Port 3000, HTTPS aktivieren – Let's Encrypt macht Dokploy automatisch). Der Admin-Bereich ist dann unter `https://<domain>/admin` erreichbar.

### 5. Datenbank-Schema (Migrations)

In Produktion (`NODE_ENV=production`) legt Payload das Schema **nicht** automatisch an. Vor dem ersten Start (und nach jeder Schema-Änderung) einmalig lokal eine Migration erzeugen und committen:

```bash
npm run payload migrate:create
```

Beim Container-Start werden ausstehende Migrations automatisch ausgeführt (`start`-Script in `package.json`). Alternativ manuell per Dokploy-Terminal: `npm run payload migrate`.

### 6. Backups (wichtig!)

- **Datenbank:** Dokploy hat eingebaute Postgres-Backups (Ziel: S3-kompatibler Storage, z. B. Hetzner Storage Box).
- **Uploads:** Das Volume `/app/uploads` regelmäßig sichern (z. B. per Cron + `rsync` auf die Storage Box) – dort liegen alle Bilder und PDFs.

## Projektstruktur

```
src/
  payload.config.ts        # zentrale CMS-Konfiguration (deutsches Admin-UI)
  collections/
    Weine.ts               # Weine inkl. Flaschenbild & Preis
    Events.ts              # Events inkl. PDF-Upload
    Verleih.ts             # Verleih-Artikel inkl. Bildergalerie
    Media.ts               # Bilder (mit automatischen Bildgrößen)
    Dokumente.ts           # PDFs
    Users.ts               # Admin-Benutzer
  globals/
    Kontakt.ts             # Kontaktdaten & Öffnungszeiten
  app/
    (frontend)/            # Website (Phase 2: Design folgt)
    (payload)/             # Admin-Panel & API (von Payload generiert)
```
