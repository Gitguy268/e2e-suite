import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

// Runs in Chromium with the real GPU (gpu-provider.ts); in software WebGL each frame took ~1.5 s.
test('spot fetch turns on sound', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser.locator('canvas#c')).toBeVisible({ timeout: 15_000 });
  await screen.getByRole('button', { name: 'Geluid aan' }).click({ timeout: 15_000 });
  await noErrors(browser);
});
