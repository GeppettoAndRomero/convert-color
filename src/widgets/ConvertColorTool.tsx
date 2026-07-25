/**
 * ConvertColorTool
 * Three text fields (HEX / RGB / HSL) kept in sync — typing in any one field
 * live-updates the other two — plus a color-swatch preview. All conversion math is
 * hand-rolled in `src/utils/colorEngine.ts`; this tool has zero runtime dependencies
 * beyond Astro/Preact (see NOTICE.md).
 *
 * Invalid input in one field shows an inline error on ONLY that field; the other two
 * fields (and the swatch) keep their last valid values — nothing is ever blanked out
 * (issue #76 confirmed design). Scope is strictly HEX/RGB/HSL: no CMYK, no HSB/HSV,
 * no named CSS colors, no picking a color from an image (that is issue #72, a
 * separate tool).
 */
import { useState, useEffect, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppField } from './AppField';
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
import { ui } from '@/i18n/ui';

interface ConvertColorToolProps {
  locale?: string;
}

// The site's own accent color (matches the <meta name="theme-color"> tag) — a
// non-empty, already-valid starting point so the swatch is never blank on load.
const DEFAULT_RGB: RGB = { r: 0x63, g: 0x66, b: 0xf1 };

export function ConvertColorTool({ locale = 'en' }: ConvertColorToolProps) {
  const t = (ui as any)[locale] ?? ui.en;

  const [hexText, setHexText] = useState(rgbToHex(DEFAULT_RGB));
  const [rgbText, setRgbText] = useState(formatRgb(DEFAULT_RGB));
  const [hslText, setHslText] = useState(formatHsl(rgbToHsl(DEFAULT_RGB)));
  const [swatch, setSwatch] = useState<RGB>(DEFAULT_RGB);
  const [hexError, setHexError] = useState<string | undefined>();
  const [rgbError, setRgbError] = useState<string | undefined>();
  const [hslError, setHslError] = useState<string | undefined>();

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  // Each handler: (1) always echoes the raw text back into its own field (so typing
  // is never blocked/reformatted mid-edit), (2) on a parse failure sets ONLY that
  // field's error and returns without touching the other two fields, (3) on success
  // clears all three errors and re-renders the other two fields + swatch from the
  // freshly parsed color.
  const handleHexChange = useCallback(
    (value: string | number) => {
      const raw = String(value);
      setHexText(raw);
      const parsed = parseHex(raw);
      if (!parsed) {
        setHexError(t.errInvalidHex);
        return;
      }
      setHexError(undefined);
      setRgbError(undefined);
      setHslError(undefined);
      setSwatch(parsed);
      setRgbText(formatRgb(parsed));
      setHslText(formatHsl(rgbToHsl(parsed)));
    },
    [t]
  );

  const handleRgbChange = useCallback(
    (value: string | number) => {
      const raw = String(value);
      setRgbText(raw);
      const parsed = parseRgb(raw);
      if (!parsed) {
        setRgbError(t.errInvalidRgb);
        return;
      }
      setRgbError(undefined);
      setHexError(undefined);
      setHslError(undefined);
      setSwatch(parsed);
      setHexText(rgbToHex(parsed));
      setHslText(formatHsl(rgbToHsl(parsed)));
    },
    [t]
  );

  const handleHslChange = useCallback(
    (value: string | number) => {
      const raw = String(value);
      setHslText(raw);
      const parsed = parseHsl(raw);
      if (!parsed) {
        setHslError(t.errInvalidHsl);
        return;
      }
      setHslError(undefined);
      setHexError(undefined);
      setRgbError(undefined);
      const rgb = hslToRgb(parsed);
      setSwatch(rgb);
      setHexText(rgbToHex(rgb));
      setRgbText(formatRgb(rgb));
    },
    [t]
  );

  const swatchHex = rgbToHex(swatch);

  return (
    <div>
      <AppCard>
        <div class="cc-grid">
          <AppField
            id="cc-hex"
            label={t.hexLabel}
            value={hexText}
            onChange={handleHexChange}
            placeholder={t.hexPlaceholder}
            error={hexError}
            locale={locale}
          />
          <AppField
            id="cc-rgb"
            label={t.rgbLabel}
            value={rgbText}
            onChange={handleRgbChange}
            placeholder={t.rgbPlaceholder}
            error={rgbError}
            locale={locale}
          />
          <AppField
            id="cc-hsl"
            label={t.hslLabel}
            value={hslText}
            onChange={handleHslChange}
            placeholder={t.hslPlaceholder}
            error={hslError}
            locale={locale}
          />
        </div>

        <div class="cc-swatch-row">
          <div
            id="cc-swatch"
            class="cc-swatch"
            style={{ backgroundColor: `rgb(${swatch.r}, ${swatch.g}, ${swatch.b})` }}
            role="img"
            aria-label={`${t.swatchAria}: ${swatchHex}`}
          />
          <span class="cc-swatch-label">{swatchHex}</span>
        </div>
      </AppCard>

      <style>{`
        .cc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: var(--space-4);
        }
        @media (max-width: 720px) {
          .cc-grid {
            grid-template-columns: 1fr;
          }
        }
        .cc-swatch-row {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-top: var(--space-2);
        }
        .cc-swatch {
          width: 96px;
          height: 96px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          flex-shrink: 0;
        }
        .cc-swatch-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: var(--fs-3);
          color: var(--color-subtle);
        }
      `}</style>
    </div>
  );
}
