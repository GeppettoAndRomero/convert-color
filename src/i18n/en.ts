import type { ToolContent } from './types';

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Convert Color — HEX, RGB, HSL in Your Browser, No Upload | runlocally',
    description:
      'Convert colors between HEX, RGB and HSL live — type into any one field and the other two update instantly, with a color swatch preview. Runs entirely in your browser. Nothing is uploaded.',
    ogTitle: 'Convert Color — HEX ↔ RGB ↔ HSL in Your Browser',
    ogDescription:
      'Type a HEX, RGB or HSL value and see the other two formats and a live swatch update instantly, right in your browser. Nothing is uploaded.',
  },

  hero: {
    h1: 'Convert Color',
    tagline:
      'HEX, RGB and HSL, kept in sync as you type — with a live color swatch. Nothing leaves your browser.',
  },

  intro: {
    h2: 'HEX, RGB and HSL, converted live in your browser',
    paras: [
      'Type a color into the HEX, RGB or HSL field and the other two update instantly, along with a swatch showing the current color. This is useful for CSS work, design handoffs, or just checking what a color code actually looks like.',
      'Conversion is hand-rolled with the standard sRGB↔HSL math (the same formulas browsers use internally for hsl() and rgb()) — no external library, nothing to fetch, nothing to upload.',
    ],
  },

  privacy: {
    h2: 'Why your input stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The conversion runs entirely in your browser.',
      'The page is served as static files and makes no request with the color values you type.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: "If you want to check for yourself, open your browser's Network panel while converting — no request carries what you type.",
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Type a color in any one field',
        p: 'Enter a HEX code (#fff or #ffffff), an RGB value (rgb(255,0,0) or 255,0,0), or an HSL value (hsl(0,100%,50%) or 0,100%,50%).',
      },
      {
        h3: 'Watch the other two update',
        p: 'The two fields you did not type into update live to the equivalent color, and the swatch preview updates to match.',
      },
      {
        h3: 'Fix invalid input',
        p: "If what you typed isn't a valid color in that format, only that field shows an inline error — the other two keep their last valid values, so you never lose your place.",
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is what I type uploaded anywhere?',
      a: "No. The conversion runs entirely in your browser. There is no server component, so the color values you type have no path off your device. The source is open and you can confirm this in your browser's Network panel.",
    },
    {
      q: 'Which HEX, RGB and HSL formats are accepted?',
      a: 'HEX accepts #fff or #ffffff (the leading # is optional, case-insensitive). RGB accepts rgb(r,g,b) or a bare r,g,b, each channel 0-255. HSL accepts hsl(h,s%,l%) or bare values, hue 0-360 and saturation/lightness 0-100.',
    },
    {
      q: 'Does it support CMYK, HSB/HSV or named CSS colors (e.g. "tomato")?',
      a: 'No — this tool is intentionally scoped to HEX, RGB and HSL only. CMYK and HSB/HSV are different color models with their own conversion assumptions, and named CSS colors are a fixed lookup table, not a conversion; none of those are part of this tool.',
    },
    {
      q: 'Can I pick a color from an image?',
      a: 'Not with this tool — picking a color from an image is a separate tool (an eyedropper). This tool only converts between color codes you type in.',
    },
    {
      q: 'What happens if I type an invalid value?',
      a: "Only the field you're editing shows an inline error. The other two fields — and the swatch — keep showing the last valid color, so a typo never blanks out your work.",
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it works without a network connection. You can also install it to your home screen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      "Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer's.",
    securityText: 'Security',
  },
};
