import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('spot-snake starts', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle("Spot's Biscuit Snake");
  await screen.getByRole('button', { name: 'Start' }).click();
  await expect(browser.locator('#overlay')).toBeHidden();
  await noErrors(browser);
});
