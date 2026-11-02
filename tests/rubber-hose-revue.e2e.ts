import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('rubber hose revue opens the game', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('The Rubber Hose Revue');
  await screen.getByRole('link', { name: 'The Game' }).click();
  await expect(browser).toHaveURL(/asteroids/);
  await browser.keyboard.press('Space');
  await noErrors(browser);
});
