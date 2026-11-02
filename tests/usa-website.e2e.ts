import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('usa website searches cities', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('The United States of America — An Editorial Guide');
  await browser.locator('#citySearch').fill('Chicago');
  await expect(browser.locator('#cityGrid .city')).toHaveCount(1);
  await expect(browser.locator('#cityGrid')).toContainText('Chicago');
  await noErrors(browser);
});
