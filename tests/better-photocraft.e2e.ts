import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('photocraft boots', async ({ app, browser, screen }) => {
  await app.open('/?nosw');
  await expect(browser).toHaveTitle('PhotoCraft');
  await expect(browser.locator('#photocraft_loading')).toBeHidden({ timeout: 60_000 });
  await expect(browser.locator('#photocraft_canvas')).toBeVisible();
  await noErrors(browser);
});
