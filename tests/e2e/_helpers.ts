import { type Page, expect } from '@playwright/test';

/** Wait until the island has hydrated and is ready for input. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

// A simple, deterministic color used by covenant/i18n/a11y specs that just need *a*
// real conversion to run, not to assert the exact shape of the sync — tests that need
// the exact three-way sync behaviour assert it themselves (see conversion.spec.ts).
export const SAMPLE_HEX = '#00ff00';
export const SAMPLE_RGB = 'rgb(0, 255, 0)';
export const SAMPLE_HSL = 'hsl(120, 100%, 50%)';

/** Type a known HEX value and wait for RGB/HSL to sync from it. */
export async function convert(page: Page) {
  await page.fill('#cc-hex', SAMPLE_HEX);
  await expect(page.locator('#cc-rgb')).toHaveValue(SAMPLE_RGB);
  await expect(page.locator('#cc-hsl')).toHaveValue(SAMPLE_HSL);
}
