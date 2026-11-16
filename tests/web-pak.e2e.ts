import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

// The repo's own Playwright test (npm run e2e) covers compressing and extracting; this checks the
// built app starts and its tools work.
test('web-pak opens and generates a password', async ({ app, browser }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('web-pak');
  await expect(browser.locator('#app')).toBeVisible();
  await browser.locator('nav button[data-view="tools"]').click();
  await browser.locator('.tabs button[data-tab="pw"]').click();
  await browser.locator('#pwGen').click();
  await expect(browser.locator('#pwInfo2')).toContainText('bits');
  await noErrors(browser);
});
