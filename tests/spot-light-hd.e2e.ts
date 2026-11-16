import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

// Runs in Chromium with the real GPU (gpu-provider.ts): it is a WebGL game with fur and shadows.
test('spot-light-hd starts lure in the living room', async ({ app, browser }) => {
  await app.open('/');
  // it paints its textures and compiles shaders at startup, which keeps the page busy for a few seconds
  await expect(browser.locator('#loading.done')).toBeAttached({ timeout: 60_000 });
  await expect(browser).toHaveTitle('Spot-light HD');
  await browser.locator('button[data-mode="lure"]').click();
  await expect(browser.locator('#hud')).toBeVisible();
  await expect(browser.locator('#hudMain')).toContainText('points');
  await noErrors(browser);
});
