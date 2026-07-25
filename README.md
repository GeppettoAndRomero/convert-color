# convert-color

Convert colors between HEX, RGB and HSL, entirely in your browser. Type into any one
of the three fields and the other two update live, along with a color swatch preview.
Open source, works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

All conversion is hand-rolled TypeScript (`src/utils/colorEngine.ts`) implementing the
standard sRGB↔HSL math — the same formulas browsers use internally for `hsl()` and
`rgb()`. There is no external library and no server component, so the color values you
type have no path off your device.

Invalid input in one field shows an inline error on only that field; the other two
fields (and the swatch) keep their last valid values rather than being cleared.

## Features

- HEX ↔ RGB ↔ HSL, kept in sync as you type (any field can be the source)
- Live color swatch preview
- Accepts `#fff`/`#ffffff`, `rgb(r,g,b)`/bare `r,g,b`, `hsl(h,s%,l%)`/bare values
- Works offline (PWA), installable

## Scope

Intentionally limited to HEX, RGB and HSL. CMYK, HSB/HSV and named CSS colors are out
of scope, as is picking a color from an image (a separate tool).

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. No runtime dependencies beyond Astro/Preact.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
