import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('liquidframe library loads', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('LiquidFrame');
  await expect(screen.getByRole('button', { name: 'Import media' })).toBeVisible();
  await screen.getByLabel('Search library').fill('cat');
  await noErrors(browser);
});
