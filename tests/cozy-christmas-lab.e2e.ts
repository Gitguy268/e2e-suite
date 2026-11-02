import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('cozy christmas lab pauses', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser.locator('canvas#screen')).toBeVisible();
  await browser.keyboard.press('p');
  await expect(browser.locator('#pauseBtn')).toHaveAttribute('aria-label', 'Resume');
  await noErrors(browser);
});
