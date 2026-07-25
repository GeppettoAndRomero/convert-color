/**
 * HEX / RGB / HSL parsing, conversion and formatting.
 *
 * Hand-rolled, no external library (see NOTICE.md — there is nothing to notice; this
 * tool has zero runtime dependencies beyond Astro/Preact). Conversion math is the
 * standard sRGB <-> HSL algorithm used by the CSS Color Module (the same formulas
 * browsers use for `hsl()` <-> `rgb()`), reproduced here so it can run standalone.
 *
 * Scope (issue #76, confirmed design): HEX, RGB and HSL only. CMYK, HSB/HSV and named
 * CSS colors are explicitly out of scope.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

const HEX_RE = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
// Accepts "rgb(r,g,b)" (wrapped) or a bare "r,g,b" / "r g b" triple.
const RGB_WRAPPER_RE = /^rgb\(\s*([^)]*)\s*\)$/i;
const HSL_WRAPPER_RE = /^hsl\(\s*([^)]*)\s*\)$/i;

function isInt(n: number): boolean {
  return Number.isFinite(n) && Number.isInteger(n);
}

/**
 * Parse a HEX color string. Accepts `#fff`/`fff` (3-digit shorthand) and
 * `#ffffff`/`ffffff` (6-digit), leading `#` optional, case-insensitive.
 * Returns null (never throws) so the caller can show an inline field error.
 */
export function parseHex(raw: string): RGB | null {
  const s = raw.trim();
  const m = HEX_RE.exec(s);
  if (!m) return null;
  let hex = m[1].toLowerCase();
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

/**
 * Parse an RGB color string. Accepts `rgb(r,g,b)` or a bare `r,g,b`; commas and/or
 * whitespace are accepted as separators. Each channel must be an integer 0-255.
 */
export function parseRgb(raw: string): RGB | null {
  const s = raw.trim();
  const wrapped = RGB_WRAPPER_RE.exec(s);
  const inner = wrapped ? wrapped[1] : s;
  const parts = inner
    .split(/[\s,]+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length !== 3) return null;

  const nums = parts.map(Number);
  if (nums.some((n) => !isInt(n))) return null;
  const [r, g, b] = nums;
  if ([r, g, b].some((n) => n < 0 || n > 255)) return null;
  return { r, g, b };
}

/**
 * Parse an HSL color string. Accepts `hsl(h,s%,l%)` or bare values; the `%` on
 * saturation/lightness is optional (both forms are treated as a 0-100 percentage).
 * Hue is 0-360, saturation/lightness are 0-100.
 */
export function parseHsl(raw: string): HSL | null {
  const s = raw.trim();
  const wrapped = HSL_WRAPPER_RE.exec(s);
  const inner = wrapped ? wrapped[1] : s;
  const parts = inner
    .split(/[\s,]+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length !== 3) return null;

  const hMatch = /^(-?\d+(?:\.\d+)?)$/.exec(parts[0]);
  if (!hMatch) return null;
  const sMatch = /^(\d+(?:\.\d+)?)%?$/.exec(parts[1]);
  const lMatch = /^(\d+(?:\.\d+)?)%?$/.exec(parts[2]);
  if (!sMatch || !lMatch) return null;

  const h = Number(hMatch[1]);
  const s2 = Number(sMatch[1]);
  const l = Number(lMatch[1]);
  if (h < 0 || h > 360) return null;
  if (s2 < 0 || s2 > 100) return null;
  if (l < 0 || l > 100) return null;
  return { h, s: s2, l };
}

/** Format an RGB value as a lowercase 6-digit `#rrggbb` string. */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/** Format an RGB value as `rgb(r, g, b)`. */
export function formatRgb(rgb: RGB): string {
  return `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
}

/** Format an HSL value as `hsl(h, s%, l%)`. */
export function formatHsl(hsl: HSL): string {
  return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

/**
 * Standard RGB (0-255 per channel) -> HSL (h: 0-360, s/l: 0-100) conversion.
 * Result is rounded to the nearest integer degree/percent, matching how the fields
 * display and re-parse values (keeps the HEX/RGB/HSL round trip stable).
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rN:
        h = (gN - bN) / d + (gN < bN ? 6 : 0);
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      default:
        h = (rN - gN) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hueToRgbChannel(p: number, q: number, tIn: number): number {
  let t = tIn;
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Standard HSL (h: 0-360, s/l: 0-100) -> RGB (0-255 per channel) conversion.
 * Result channels are rounded to the nearest integer.
 */
export function hslToRgb({ h, s, l }: HSL): RGB {
  const hN = ((h % 360) + 360) % 360 / 360;
  const sN = s / 100;
  const lN = l / 100;

  if (sN === 0) {
    const v = Math.round(lN * 255);
    return { r: v, g: v, b: v };
  }

  const q = lN < 0.5 ? lN * (1 + sN) : lN + sN - lN * sN;
  const p = 2 * lN - q;

  return {
    r: Math.round(hueToRgbChannel(p, q, hN + 1 / 3) * 255),
    g: Math.round(hueToRgbChannel(p, q, hN) * 255),
    b: Math.round(hueToRgbChannel(p, q, hN - 1 / 3) * 255),
  };
}
