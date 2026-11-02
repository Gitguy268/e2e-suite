import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('convert loads its formats', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Convert to it!');
  await expect(browser.locator('#uploadFile')).toBeEnabled({ timeout: 60_000 });
  await noErrors(browser);
});
