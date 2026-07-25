import { describe, it, expect } from 'vitest';
import {
  parseHex,
  parseRgb,
  parseHsl,
  rgbToHex,
  formatRgb,
  formatHsl,
  rgbToHsl,
  hslToRgb,
  type RGB,
} from '@/utils/colorEngine';

describe('parseHex', () => {
  it('parses a 6-digit hex with #', () => {
    expect(parseHex('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses a 6-digit hex without #', () => {
    expect(parseHex('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses a 3-digit shorthand with #', () => {
    expect(parseHex('#f00')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses a 3-digit shorthand without #', () => {
    expect(parseHex('f00')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('is case-insensitive', () => {
    expect(parseHex('#FF00AA')).toEqual({ r: 255, g: 0, b: 170 });
    expect(parseHex('#Ff00aA')).toEqual({ r: 255, g: 0, b: 170 });
  });
  it('tolerates surrounding whitespace', () => {
    expect(parseHex('  #fff  ')).toEqual({ r: 255, g: 255, b: 255 });
  });
  it('rejects invalid lengths', () => {
    expect(parseHex('#ff00')).toBeNull();
    expect(parseHex('#fffffff')).toBeNull();
    expect(parseHex('#f')).toBeNull();
  });
  it('rejects non-hex characters', () => {
    expect(parseHex('#gggggg')).toBeNull();
    expect(parseHex('zzz')).toBeNull();
  });
  it('rejects empty input', () => {
    expect(parseHex('')).toBeNull();
  });
});

describe('parseRgb', () => {
  it('parses the rgb(...) wrapped form', () => {
    expect(parseRgb('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses a bare comma-separated triple', () => {
    expect(parseRgb('255,0,0')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses a bare space-separated triple', () => {
    expect(parseRgb('255 0 0')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('is case-insensitive on the wrapper', () => {
    expect(parseRgb('RGB(0, 128, 255)')).toEqual({ r: 0, g: 128, b: 255 });
  });
  it('accepts boundary channel values 0 and 255', () => {
    expect(parseRgb('0,0,0')).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseRgb('255,255,255')).toEqual({ r: 255, g: 255, b: 255 });
  });
  it('rejects out-of-range channels', () => {
    expect(parseRgb('256,0,0')).toBeNull();
    expect(parseRgb('0,-1,0')).toBeNull();
  });
  it('rejects non-integer channels', () => {
    expect(parseRgb('1.5,0,0')).toBeNull();
    expect(parseRgb('a,0,0')).toBeNull();
  });
  it('rejects the wrong number of channels', () => {
    expect(parseRgb('255,0')).toBeNull();
    expect(parseRgb('255,0,0,0')).toBeNull();
  });
  it('rejects empty input', () => {
    expect(parseRgb('')).toBeNull();
  });
});

describe('parseHsl', () => {
  it('parses the hsl(...) wrapped form with % signs', () => {
    expect(parseHsl('hsl(0, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50 });
  });
  it('parses a bare comma-separated triple with % signs', () => {
    expect(parseHsl('120, 100%, 50%')).toEqual({ h: 120, s: 100, l: 50 });
  });
  it('parses bare values without % signs', () => {
    expect(parseHsl('240, 100, 50')).toEqual({ h: 240, s: 100, l: 50 });
  });
  it('is case-insensitive on the wrapper', () => {
    expect(parseHsl('HSL(0, 0%, 100%)')).toEqual({ h: 0, s: 0, l: 100 });
  });
  it('accepts boundary values (h=0/360, s/l=0/100)', () => {
    expect(parseHsl('0, 0%, 0%')).toEqual({ h: 0, s: 0, l: 0 });
    expect(parseHsl('360, 100%, 100%')).toEqual({ h: 360, s: 100, l: 100 });
  });
  it('rejects an out-of-range hue', () => {
    expect(parseHsl('361, 50%, 50%')).toBeNull();
    expect(parseHsl('-1, 50%, 50%')).toBeNull();
  });
  it('rejects out-of-range saturation/lightness', () => {
    expect(parseHsl('0, 101%, 50%')).toBeNull();
    expect(parseHsl('0, 50%, -1%')).toBeNull();
  });
  it('rejects the wrong number of values', () => {
    expect(parseHsl('0, 50%')).toBeNull();
  });
  it('rejects empty input', () => {
    expect(parseHsl('')).toBeNull();
  });
});

describe('formatting', () => {
  it('rgbToHex formats as lowercase #rrggbb', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 170 })).toBe('#ff00aa');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });
  it('formatRgb formats as rgb(r, g, b)', () => {
    expect(formatRgb({ r: 255, g: 0, b: 0 })).toBe('rgb(255, 0, 0)');
  });
  it('formatHsl formats as hsl(h, s%, l%)', () => {
    expect(formatHsl({ h: 0, s: 100, l: 50 })).toBe('hsl(0, 100%, 50%)');
  });
});

// --- Boundary-value conversions (issue #76 confirmed design: 純赤/緑/青/白/黒/グレー) ---
describe('rgbToHsl / hslToRgb — boundary values', () => {
  const cases: Array<{ name: string; rgb: RGB; hsl: { h: number; s: number; l: number } }> = [
    { name: 'pure red', rgb: { r: 255, g: 0, b: 0 }, hsl: { h: 0, s: 100, l: 50 } },
    { name: 'pure green', rgb: { r: 0, g: 255, b: 0 }, hsl: { h: 120, s: 100, l: 50 } },
    { name: 'pure blue', rgb: { r: 0, g: 0, b: 255 }, hsl: { h: 240, s: 100, l: 50 } },
    { name: 'white', rgb: { r: 255, g: 255, b: 255 }, hsl: { h: 0, s: 0, l: 100 } },
    { name: 'black', rgb: { r: 0, g: 0, b: 0 }, hsl: { h: 0, s: 0, l: 0 } },
    { name: 'mid gray', rgb: { r: 128, g: 128, b: 128 }, hsl: { h: 0, s: 0, l: 50 } },
  ];

  for (const { name, rgb, hsl } of cases) {
    it(`converts ${name} RGB -> HSL exactly`, () => {
      expect(rgbToHsl(rgb)).toEqual(hsl);
    });
    it(`converts ${name} HSL -> RGB exactly`, () => {
      expect(hslToRgb(hsl)).toEqual(rgb);
    });
  }
});

// --- Round-trip stability (issue #76: HEX→HSL→HEX の往復安定性、±1 丸め誤差は許容) ---
describe('HEX -> HSL -> HEX round trip', () => {
  // A spread of common web-safe / named colors, including several whose HSL
  // conversion is known to hit a rounding boundary (verified against the reference
  // implementation — this is the ±1 tolerance issue #76 explicitly allows for).
  const hexes = [
    '#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000', '#808080',
    '#ffff00', '#00ffff', '#ff00ff',
    '#ffa500', // orange
    '#800080', // purple
    '#008080', // teal
    '#000080', // navy
    '#808000', // olive
    '#c0c0c0', // silver
    '#708090', // slate gray
    '#ff6347', // tomato
    '#1e90ff', // dodger blue
  ];

  const channelDiff = (a: RGB, b: RGB) =>
    Math.max(Math.abs(a.r - b.r), Math.abs(a.g - b.g), Math.abs(a.b - b.b));

  for (const hex of hexes) {
    it(`round-trips ${hex} within a ±1 rounding tolerance`, () => {
      const rgb = parseHex(hex)!;
      expect(rgb).not.toBeNull();
      const hsl = rgbToHsl(rgb);
      const back = hslToRgb(hsl);
      const backHex = rgbToHex(back);

      // Exact string match is the common case; when rounding does drift, it must
      // never exceed 1 on any channel (the tolerance issue #76 allows for).
      if (backHex !== hex) {
        expect(channelDiff(rgb, back)).toBeLessThanOrEqual(1);
      } else {
        expect(backHex).toBe(hex);
      }
    });
  }

  it('never drifts by more than 1 on any channel across the whole set', () => {
    for (const hex of hexes) {
      const rgb = parseHex(hex)!;
      const back = hslToRgb(rgbToHsl(rgb));
      expect(channelDiff(rgb, back)).toBeLessThanOrEqual(1);
    }
  });
});

describe('hslToRgb — saturation 0 is achromatic regardless of hue', () => {
  it('ignores hue when saturation is 0', () => {
    expect(hslToRgb({ h: 0, s: 0, l: 50 })).toEqual(hslToRgb({ h: 275, s: 0, l: 50 }));
  });
});
