import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('ipod menu renders', async ({ app, browser, screen }) => {
  await app.open('/ipod');
  await expect(browser).toHaveTitle('iPod.js');
  await expect(screen.getByText('Music').first()).toBeVisible();
  await browser.keyboard.press('Space');
  await noErrors(browser);
});
