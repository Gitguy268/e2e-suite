import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('flashnack loads the sample photos', async ({ app, browser }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Flashnack');
  await browser.locator('#try-samples').click();
  await expect(browser.locator('#export')).toBeEnabled({ timeout: 30_000 });
  await noErrors(browser);
});
