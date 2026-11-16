import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('lvw-bench leaderboard switches track', async ({ app, browser }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('LvW-bench leaderboard');
  await expect(browser.locator('#board')).toBeVisible();
  await browser.locator('button[data-t="answer"]').click();
  expect(await browser.evaluate<string>('document.querySelector(\'button[data-t="answer"]\').className')).toContain('on');
  await noErrors(browser);
});
