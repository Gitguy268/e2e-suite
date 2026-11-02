import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { noErrors } from './_noErrors.ts';

test('textarea takes a note', async ({ app, browser, screen }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Textarea');
  await screen.getByRole('textbox', { name: 'Note' }).click();
  await browser.keyboard.type('hello e2e');
  await expect(screen.getByRole('textbox', { name: 'Note' })).toContainText('hello e2e');
  await noErrors(browser);
});
