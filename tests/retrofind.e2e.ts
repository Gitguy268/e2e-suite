import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

// Types a query but never searches: the suite points server.py at a SearXNG address that isn't there.
test('retrofind takes a query', async ({ app, browser }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Retrofind');
  const q = browser.locator('.home-form input[name=q]');
  await q.fill('black labrador');
  await expect(q).toHaveValue('black labrador');
  await noErrors(browser);
});
