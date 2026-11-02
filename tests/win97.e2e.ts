import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('win97 opens Paint', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser.locator('.desktop')).toBeVisible();
  await expect(browser.locator('section.win')).toHaveCount(0);
  await browser.locator('[data-app="paint"]').first().dblclick();
  await expect(browser.locator('section.win')).toHaveCount(1);
  await noErrors(browser);
});
