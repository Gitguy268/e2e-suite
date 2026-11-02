import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('audiocheck checks a file', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('audiocheck');
  await browser.locator('#files').setInputFiles(['fixtures/clipped.wav']);
  await expect(browser.locator('#status')).toHaveText('Checked 1 file.', { timeout: 60_000 });
  await noErrors(browser);
});
