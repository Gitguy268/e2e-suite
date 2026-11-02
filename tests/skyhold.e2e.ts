import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('skyhold sets up and shows the cloud key', async ({ app, browser, screen }) => {
  await app.open('/#t=e2e');
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('Skyhold');
  await screen.getByPlaceholder('Release password (8+ characters)').fill('hunter2hunter2');
  await screen.getByPlaceholder('Repeat password').fill('hunter2hunter2');
  await screen.getByRole('button', { name: 'Set up' }).click();
  await expect(screen.getByRole('heading', { name: 'Your cloud key' })).toBeVisible();
  await screen.getByRole('button', { name: 'I wrote it down' }).click();
  await expect(screen.getByRole('heading', { name: 'Clouds' })).toBeVisible();
  await noErrors(browser);
});
