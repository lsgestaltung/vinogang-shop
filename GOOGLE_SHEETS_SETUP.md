# Google Sheets Newsletter Setup Guide

Diese Anleitung zeigt dir Schritt für Schritt, wie du Google Sheets für deine Newsletter-E-Mails einrichtest.

## Schritt 1: Google Sheet erstellen

1. Gehe zu [Google Sheets](https://sheets.google.com)
2. Erstelle ein neues Sheet (z.B. "Vinogang Newsletter Subscribers")
3. Füge in Zeile 1 die Header ein:
   - Spalte A: `Email`
   - Spalte B: `Timestamp`
4. Kopiere die **Sheet ID** aus der URL:
   - URL-Format: `https://docs.google.com/spreadsheets/d/HIER_IST_DIE_ID/edit`
   - Die ID ist der lange String zwischen `/d/` und `/edit`

## Schritt 2: Google Cloud Project erstellen

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt (z.B. "Vinogang Newsletter")
3. Wähle das Projekt aus

## Schritt 3: Google Sheets API aktivieren

1. Gehe zu "APIs & Services" > "Library"
2. Suche nach "Google Sheets API"
3. Klicke auf "Enable" / "Aktivieren"

## Schritt 4: Service Account erstellen

1. Gehe zu "APIs & Services" > "Credentials"
2. Klicke auf "Create Credentials" > "Service Account"
3. Gib einen Namen ein (z.B. "newsletter-service")
4. Klicke auf "Create and Continue"
5. Rolle: Wähle "Editor" (optional, kann auch übersprungen werden)
6. Klicke auf "Done"

## Schritt 5: Service Account Key erstellen

1. Klicke auf den gerade erstellten Service Account
2. Gehe zum Tab "Keys"
3. Klicke auf "Add Key" > "Create new key"
4. Wähle "JSON" als Format
5. Klicke auf "Create"
6. **Eine JSON-Datei wird heruntergeladen - BEWAHRE DIESE SICHER AUF!**

## Schritt 6: Service Account Zugriff auf Sheet geben

1. Öffne die heruntergeladene JSON-Datei
2. Kopiere die E-Mail-Adresse aus dem Feld `client_email` 
   (z.B. `newsletter-service@vinogang-newsletter.iam.gserviceaccount.com`)
3. Gehe zurück zu deinem Google Sheet
4. Klicke auf "Share" / "Teilen"
5. Füge die Service Account E-Mail ein
6. Gib "Editor"-Rechte
7. **WICHTIG:** Deaktiviere "Notify people" (keine Benachrichtigung senden)
8. Klicke auf "Share" / "Teilen"

## Schritt 7: Umgebungsvariablen einrichten

### Lokal (für Entwicklung):

1. Erstelle eine `.env.local` Datei im Projekt-Root:
   ```bash
   cp .env.example .env.local
   ```

2. Öffne `.env.local` und füge ein:
   ```env
   GOOGLE_SHEET_ID=deine_sheet_id_hier
   GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key":"..."}
   ```

3. Für `GOOGLE_SERVICE_ACCOUNT_KEY`:
   - Öffne die heruntergeladene JSON-Datei
   - Kopiere den **gesamten Inhalt** (alles zwischen `{` und `}`)
   - Füge ihn als **eine Zeile** ein (keine Zeilenumbrüche!)

### Auf Vercel (für Production):

1. Gehe zu deinem Vercel-Projekt
2. Klicke auf "Settings" > "Environment Variables"
3. Füge hinzu:
   - Name: `GOOGLE_SHEET_ID`
   - Value: Deine Sheet ID
   
4. Füge hinzu:
   - Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
   - Value: Der komplette JSON-Inhalt (als eine Zeile)

5. Klicke auf "Save"
6. **Wichtig:** Redeploy deine App, damit die Variablen aktiv werden

## Schritt 8: Testen

1. Starte den Dev-Server:
   ```bash
   npm run dev
   ```

2. Öffne die Website
3. Trage eine Test-E-Mail im Newsletter-Formular ein
4. Prüfe dein Google Sheet - die E-Mail sollte dort erscheinen!

## Troubleshooting

### Fehler: "Missing Google Sheets credentials"
- Stelle sicher, dass `.env.local` existiert
- Prüfe, ob die Umgebungsvariablen korrekt gesetzt sind
- Starte den Dev-Server neu

### Fehler: "Permission denied"
- Stelle sicher, dass der Service Account Zugriff auf das Sheet hat
- Prüfe, ob die Service Account E-Mail als Editor hinzugefügt wurde

### Fehler beim JSON-Parsing
- Stelle sicher, dass `GOOGLE_SERVICE_ACCOUNT_KEY` als **eine Zeile** ohne Zeilenumbrüche eingefügt ist
- Prüfe, ob alle Anführungszeichen korrekt sind

## Sicherheitshinweise

⚠️ **WICHTIG:**
- Teile niemals deine Service Account JSON-Datei öffentlich
- Füge `.env.local` zur `.gitignore` hinzu (ist standardmäßig der Fall)
- Die JSON-Datei enthält private Keys - bewahre sie sicher auf!

## Support

Bei Fragen oder Problemen, check die Vercel-Logs oder die Browser-Console für detaillierte Fehlermeldungen.
