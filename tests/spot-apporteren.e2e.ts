import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('spot sits', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Spot apporteert');
  await expect(browser.locator('canvas#cv')).toBeVisible();
  const before = await browser.evaluate<string>("document.getElementById('status').textContent");
  await browser.locator('#k-zit').click();
  await expect(screen.getByRole('status')).not.toHaveText(before);
  await noErrors(browser);
});
