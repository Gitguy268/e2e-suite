import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('mp4 composition renders', async ({ app, browser, screen }) => {
  await app.open('/');
  // The composition starts paused with the hero faded out, so check the timeline loaded instead.
  await expect(browser.locator('#s1-h')).toHaveCount(1);
  expect(await browser.evaluate<boolean>('!!window.__timelines?.main')).toBe(true);
  await noErrors(browser);
});
