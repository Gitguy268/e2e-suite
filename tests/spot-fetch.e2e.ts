import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

// shortcut: headless Chromium renders this WebGL scene in software (~1.5s per frame), so every
// read is slow; web() can't pass --use-angle=metal yet. Drop the long timeouts when it can.
test('spot fetch turns on sound', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser.locator('canvas#c')).toBeVisible({ timeout: 30_000 });
  await screen.getByRole('button', { name: 'Geluid aan' }).click({ timeout: 60_000 }); // about 27 s in software WebGL
  await noErrors(browser);
});
