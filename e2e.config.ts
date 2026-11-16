import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { apps } from './apps.ts';
import { gpuChromium } from './gpu-provider.ts';

// WebGL apps run in Chromium with the real GPU; the rest use e2e's default browser
const GPU_APPS = new Set(['spot-fetch', 'spot-light-hd']);

const APP = process.env.APP ?? '';
if (!apps[APP]) throw new Error(`Set APP to one of: ${Object.keys(apps).join(', ')}`);

export default {
  projectId: 'e2e-suite',
  targets: [{ name: APP, engine: web({ initScripts: [{ path: 'errors.js' }], ...(GPU_APPS.has(APP) ? { browser: gpuChromium } : {}) }), app: apps[APP] }],
  tests: `tests/${APP}.e2e.ts`,
  output: `.e2e/${APP}`,
  reporters: ['list', 'markdown'],
} satisfies E2EConfig;
