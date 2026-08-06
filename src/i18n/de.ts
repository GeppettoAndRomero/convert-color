import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Begriffe und Wendungen, die deutsche Farbcode-Konverter tatsächlich verwenden.
// Keine Werbefloskeln (einfach / schnell / kinderleicht / perfekt) — Datenschutz
// wird strukturell begründet, nicht versprochen (BRAND-OPERATING-MODEL /
// I18N-SEO-GUIDELINE). Register: informelles „du“, wie bei kostenlosen Browser-Tools üblich.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Farbe umwandeln — HEX, RGB, HSL im Browser, ohne Upload | runlocally',
    description:
      'Wandle Farben live zwischen HEX, RGB und HSL um: Tippe in eines der drei Felder, die anderen beiden aktualisieren sich sofort, inklusive Farbvorschau. Läuft vollständig im Browser. Nichts wird hochgeladen.',
    ogTitle: 'Farbe umwandeln — HEX ↔ RGB ↔ HSL im Browser',
    ogDescription:
      'Tippe einen HEX-, RGB- oder HSL-Wert ein und sieh, wie die anderen beiden Formate und eine Farbvorschau sich sofort aktualisieren — direkt im Browser.',
  },

  hero: {
    h1: 'Farbe umwandeln',
    tagline: 'HEX, RGB und HSL bleiben beim Tippen synchron — mit Live-Farbvorschau. Nichts verlässt deinen Browser.',
  },

  intro: {
    h2: 'HEX, RGB und HSL live im Browser umwandeln',
    paras: [
      'Tippe eine Farbe in das HEX-, RGB- oder HSL-Feld ein, und die anderen beiden aktualisieren sich sofort, zusammen mit einer Vorschau der aktuellen Farbe. Praktisch für CSS-Arbeit, die Übergabe an ein Design, oder um einfach zu sehen, wie ein Farbcode tatsächlich aussieht.',
      'Die Umwandlung ist selbst geschrieben und nutzt die Standard-sRGB↔HSL-Mathematik (dieselben Formeln, die Browser intern für hsl() und rgb() verwenden) — keine externe Bibliothek, nichts wird geladen oder hochgeladen.',
    ],
  },

  privacy: {
    h2: 'Warum deine Eingaben auf dem Gerät bleiben',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem etwas hochgeladen werden könnte:',
    points: [
      'Die Umwandlung läuft vollständig in deinem Browser.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit den Farbwerten, die du eingibst.',
      'Der Quellcode ist offen und kann von allen eingesehen werden (MIT).',
      'Die Seite funktioniert offline – was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne beim Umwandeln das Netzwerk-Panel deines Browsers – keine Anfrage trägt deine Eingaben.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Farbe in ein beliebiges Feld eingeben',
        p: 'Gib einen HEX-Code (#fff oder #ffffff), einen RGB-Wert (rgb(255,0,0) oder 255,0,0) oder einen HSL-Wert (hsl(0,100%,50%) oder 0,100%,50%) ein.',
      },
      {
        h3: 'Die anderen beiden aktualisieren sich',
        p: 'Die beiden Felder, in die du nicht getippt hast, aktualisieren sich live zur entsprechenden Farbe, und die Vorschau passt sich an.',
      },
      {
        h3: 'Ungültige Eingaben nur in diesem Feld',
        p: 'Ist deine Eingabe in diesem Format ungültig, zeigt nur dieses Feld einen Hinweis direkt im Feld — die anderen beiden behalten ihre letzten gültigen Werte, du verlierst also nie deinen Stand.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird das, was ich eingebe, irgendwohin hochgeladen?',
      a: 'Nein. Die Umwandlung läuft vollständig in deinem Browser. Es gibt keine Serverkomponente, also gibt es für die Farbwerte, die du eingibst, keinen Weg vom Gerät. Der Quellcode ist offen und du kannst das im Netzwerk-Panel deines Browsers nachprüfen.',
    },
    {
      q: 'Welche HEX-, RGB- und HSL-Formate werden akzeptiert?',
      a: 'HEX akzeptiert #fff oder #ffffff (das führende # ist optional, Groß-/Kleinschreibung egal). RGB akzeptiert rgb(r,g,b) oder ein einfaches r,g,b, jeder Kanal 0-255. HSL akzeptiert hsl(h,s%,l%) oder einfache Werte, Farbton 0-360 und Sättigung/Helligkeit 0-100.',
    },
    {
      q: 'Werden CMYK, HSB/HSV oder benannte CSS-Farben (z. B. "tomato") unterstützt?',
      a: 'Nein — dieses Tool ist bewusst auf HEX, RGB und HSL beschränkt. CMYK und HSB/HSV sind andere Farbmodelle mit eigenen Annahmen, und benannte CSS-Farben sind eine feste Tabelle, keine Umwandlung; keines von beidem gehört zu diesem Tool.',
    },
    {
      q: 'Kann ich eine Farbe aus einem Bild auswählen?',
      a: 'Mit diesem Tool nicht — eine Farbe aus einem Bild auszuwählen (eine Pipette) ist ein eigenes Tool. Dieses Tool wandelt nur zwischen Farbcodes um, die du selbst eingibst.',
    },
    {
      q: 'Was passiert, wenn ich einen ungültigen Wert eingebe?',
      a: 'Nur das Feld, das du gerade bearbeitest, zeigt einen Hinweis direkt im Feld. Die anderen beiden Felder — und die Vorschau — zeigen weiterhin die zuletzt gültige Farbe, ein Tippfehler löscht also nie deine Arbeit.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Das Tool ist eine PWA. Nach dem ersten Besuch wird es zwischengespeichert, sodass es ohne Netzwerkverbindung funktioniert. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },

  related: {
    h2: 'Ähnliche Tools',
    blogLinkText: 'Technische Hintergründe lesen',
  },
};
