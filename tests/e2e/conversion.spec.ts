import { test, expect, type Page } from '@playwright/test';
import { waitReady } from './_helpers';

/** Track every request the page makes and fail if any leaves the origin. */
function trackExternalRequests(page: Page): string[] {
  const external: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (!url.startsWith('http://localhost:4329') && !url.startsWith('data:') && !url.startsWith('blob:')) {
      external.push(url);
    }
  });
  return external;
}

test.describe('convert color', () => {
  test('typing a HEX value updates RGB and HSL, and the swatch matches, uploading nothing (#1)', async ({
    page,
  }) => {
    const external = trackExternalRequests(page);
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-hex', '00ff00'); // no leading '#', lowercase — both accepted
    await expect(page.locator('#cc-rgb')).toHaveValue('rgb(0, 255, 0)');
    await expect(page.locator('#cc-hsl')).toHaveValue('hsl(120, 100%, 50%)');
    await expect(page.locator('#cc-swatch')).toHaveCSS('background-color', 'rgb(0, 255, 0)');
    await expect(page.locator('#cc-hex-error')).toHaveCount(0);
    await expect(page.locator('#cc-rgb-error')).toHaveCount(0);
    await expect(page.locator('#cc-hsl-error')).toHaveCount(0);

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('typing an RGB value updates HEX and HSL, and the swatch matches', async ({ page }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-rgb', '0, 0, 255');
    await expect(page.locator('#cc-hex')).toHaveValue('#0000ff');
    await expect(page.locator('#cc-hsl')).toHaveValue('hsl(240, 100%, 50%)');
    await expect(page.locator('#cc-swatch')).toHaveCSS('background-color', 'rgb(0, 0, 255)');
  });

  test('typing a bare RGB triple (no wrapper, no spaces) also works', async ({ page }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-rgb', '255,255,0');
    await expect(page.locator('#cc-hex')).toHaveValue('#ffff00');
    await expect(page.locator('#cc-hsl')).toHaveValue('hsl(60, 100%, 50%)');
  });

  test('typing an HSL value updates HEX and RGB, and the swatch matches', async ({ page }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-hsl', 'hsl(0, 100%, 50%)');
    await expect(page.locator('#cc-hex')).toHaveValue('#ff0000');
    await expect(page.locator('#cc-rgb')).toHaveValue('rgb(255, 0, 0)');
    await expect(page.locator('#cc-swatch')).toHaveCSS('background-color', 'rgb(255, 0, 0)');
  });

  test('typing bare HSL values without % signs also works', async ({ page }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-hsl', '240, 100, 50');
    await expect(page.locator('#cc-hex')).toHaveValue('#0000ff');
    await expect(page.locator('#cc-rgb')).toHaveValue('rgb(0, 0, 255)');
  });

  test('accepts 3-digit HEX shorthand', async ({ page }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-hex', '#f00');
    await expect(page.locator('#cc-rgb')).toHaveValue('rgb(255, 0, 0)');
    await expect(page.locator('#cc-hsl')).toHaveValue('hsl(0, 100%, 50%)');
  });

  test('an invalid HEX shows an error on only that field; RGB/HSL keep their last valid values', async ({
    page,
  }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    // Establish a known-good state first.
    await page.fill('#cc-hex', '#336699');
    await expect(page.locator('#cc-rgb')).toHaveValue('rgb(51, 102, 153)');
    const lastValidRgb = await page.locator('#cc-rgb').inputValue();
    const lastValidHsl = await page.locator('#cc-hsl').inputValue();

    await page.fill('#cc-hex', 'not-a-color');

    await expect(page.locator('#cc-hex-error')).toBeVisible();
    await expect(page.locator('#cc-hex-error')).toContainText(/HEX/);
    await expect(page.locator('#cc-hex')).toHaveAttribute('aria-invalid', 'true');

    // The other two fields are untouched — no error, same last-valid text.
    await expect(page.locator('#cc-rgb-error')).toHaveCount(0);
    await expect(page.locator('#cc-hsl-error')).toHaveCount(0);
    await expect(page.locator('#cc-rgb')).toHaveValue(lastValidRgb);
    await expect(page.locator('#cc-hsl')).toHaveValue(lastValidHsl);
  });

  test('an invalid RGB shows an error on only that field; HEX/HSL keep their last valid values', async ({
    page,
  }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-rgb', 'rgb(10, 20, 30)');
    const lastValidHex = await page.locator('#cc-hex').inputValue();
    const lastValidHsl = await page.locator('#cc-hsl').inputValue();

    await page.fill('#cc-rgb', '300, 0, 0'); // out of range (0-255)

    await expect(page.locator('#cc-rgb-error')).toBeVisible();
    await expect(page.locator('#cc-rgb')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#cc-hex-error')).toHaveCount(0);
    await expect(page.locator('#cc-hsl-error')).toHaveCount(0);
    await expect(page.locator('#cc-hex')).toHaveValue(lastValidHex);
    await expect(page.locator('#cc-hsl')).toHaveValue(lastValidHsl);
  });

  test('an invalid HSL shows an error on only that field; HEX/RGB keep their last valid values', async ({
    page,
  }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-hsl', 'hsl(200, 50%, 50%)');
    const lastValidHex = await page.locator('#cc-hex').inputValue();
    const lastValidRgb = await page.locator('#cc-rgb').inputValue();

    await page.fill('#cc-hsl', '400, 50%, 50%'); // out-of-range hue (0-360)

    await expect(page.locator('#cc-hsl-error')).toBeVisible();
    await expect(page.locator('#cc-hsl')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#cc-hex-error')).toHaveCount(0);
    await expect(page.locator('#cc-rgb-error')).toHaveCount(0);
    await expect(page.locator('#cc-hex')).toHaveValue(lastValidHex);
    await expect(page.locator('#cc-rgb')).toHaveValue(lastValidRgb);
  });

  test('recovering from an invalid value clears the error and resumes the sync', async ({ page }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await page.fill('#cc-hex', 'nope');
    await expect(page.locator('#cc-hex-error')).toBeVisible();

    await page.fill('#cc-hex', '#123456');
    await expect(page.locator('#cc-hex-error')).toHaveCount(0);
    await expect(page.locator('#cc-rgb')).toHaveValue('rgb(18, 52, 86)');
    await expect(page.locator('#cc-hsl')).toHaveValue('hsl(210, 65%, 20%)');
  });

  test('loads with a valid, non-empty default color (swatch and all three fields populated)', async ({
    page,
  }) => {
    await page.goto('/convert-color/');
    await waitReady(page);

    await expect(page.locator('#cc-hex')).not.toHaveValue('');
    await expect(page.locator('#cc-rgb')).not.toHaveValue('');
    await expect(page.locator('#cc-hsl')).not.toHaveValue('');
    await expect(page.locator('#cc-hex-error')).toHaveCount(0);
    await expect(page.locator('#cc-rgb-error')).toHaveCount(0);
    await expect(page.locator('#cc-hsl-error')).toHaveCount(0);
  });
});
