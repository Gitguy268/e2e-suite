import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('hillium landing renders', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Hillium: a privacy layer for Helium');
  await expect(screen.getByRole('heading', { level: 1 })).toContainText('Hillium');
  await noErrors(browser);
});
