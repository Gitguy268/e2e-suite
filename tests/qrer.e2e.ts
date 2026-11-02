import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('qrer encodes a link', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('Qrer');
  await browser.locator('#data').fill('https://example.com');
  await expect(screen.getByRole('button', { name: 'Download PNG' })).toBeEnabled();
  await noErrors(browser);
});
