import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('vinyl motor turns on', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Realistic Vinyl Player');
  await screen.getByRole('button', { name: 'Motor power' }).click();
  await expect(browser.locator('#motorBtn')).toHaveAttribute('aria-pressed', 'true');
  await noErrors(browser);
});
