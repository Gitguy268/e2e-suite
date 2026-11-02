import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { apps } from './apps.ts';

const APP = process.env.APP ?? '';
if (!apps[APP]) throw new Error(`Set APP to one of: ${Object.keys(apps).join(', ')}`);

export default {
  projectId: 'e2e-suite',
  targets: [{ name: APP, engine: web({ initScripts: [{ path: 'errors.js' }] }), app: apps[APP] }],
  tests: `tests/${APP}.e2e.ts`,
  output: `.e2e/${APP}`,
  reporters: ['list', 'markdown'],
} satisfies E2EConfig;
