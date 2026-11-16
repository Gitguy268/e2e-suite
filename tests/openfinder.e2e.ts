import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

// Since the 2026-11-01 build OpenFinder opens on "All"; the Sandbox is one click away in the sidebar.
test('openfinder opens Documents', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('All');
  await screen.getByText('Sandbox', { exact: true }).first().click();
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('Sandbox');
  await screen.getByRole('option', { name: 'Documents' }).dblclick();
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('Documents');
  await noErrors(browser);
});
