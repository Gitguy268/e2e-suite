import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('tabshell boots the VM', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('TabShell');
  await expect(screen.getByRole('main', { name: 'Terminal' })).toBeVisible();
  await expect(browser.locator('#status')).not.toContainText('Booting', { timeout: 90_000 });
  await noErrors(browser);
});
