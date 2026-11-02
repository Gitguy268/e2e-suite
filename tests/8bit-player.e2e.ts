import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('8bit-player starts', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('8-BIT PLAYER // STAGE + TURNTABLE');
  await screen.getByRole('button', { name: '▶ PRESS START' }).click();
  await expect(browser.locator('#splash')).toBeHidden();
  await noErrors(browser);
});
