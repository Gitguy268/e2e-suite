import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('web2app form takes a URL', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('web2app');
  // Fill only; never press Build, it runs a real native build.
  await browser.locator('input[name=url]').fill('https://example.com');
  await expect(browser.locator('input[name=url]')).toHaveValue('https://example.com');
  await noErrors(browser);
});
