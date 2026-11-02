import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('portfolio boots into the website', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle(/Lucas van de Weerd/);
  await screen.getByLabel('Choose an experience by number or name').fill('1');
  await browser.keyboard.press('Enter');
  await expect(browser).toHaveURL(/view=website/);
  await noErrors(browser);
});
