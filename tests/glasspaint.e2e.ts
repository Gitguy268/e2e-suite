import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('glasspaint opens the File menu', async ({ app, browser, screen }) => {
  await app.open('/GlassPaint/');
  await expect(browser).toHaveTitle('GlassPaint - image editor');
  await expect(browser.locator('#canvas_minipaint')).toBeVisible();
  await browser.locator('#main_menu_0_0').click();
  await expect(browser.locator('#main_menu_0_0')).toHaveAttribute('aria-expanded', 'true');
  await noErrors(browser);
});
