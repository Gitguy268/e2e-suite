import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('archium landing renders', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Archium: a privacy layer for Helium');
  await expect(screen.getByRole('heading', { level: 1 })).toContainText('Archium');
  await noErrors(browser);
});
