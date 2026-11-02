import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('openfinder opens Documents', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('Sandbox');
  await screen.getByRole('option', { name: 'Documents' }).dblclick();
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('Documents');
  await noErrors(browser);
});
