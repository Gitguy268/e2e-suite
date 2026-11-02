import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('spot-light starts dodge', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Spot-light');
  await browser.locator('button[data-mode="dodge"]').click();
  await expect(browser.locator('#hud')).toBeVisible();
  await noErrors(browser);
});
