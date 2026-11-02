import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('pikado creates a document', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Pikado — Image Studio');
  await screen.getByRole('button', { name: 'New document' }).first().click();
  await expect(browser.locator('canvas#view')).toBeVisible();
  await noErrors(browser);
});
