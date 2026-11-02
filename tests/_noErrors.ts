import { expect } from 'e2e';

export const noErrors = async (browser: { evaluate<T>(fn: string): Promise<T> }) =>
  expect(await browser.evaluate<string[]>('window.__errs')).toEqual([]);
