// A browser provider for e2e's web() engine: Playwright's own Chromium, headless, with the real
// GPU (Metal through ANGLE). web() has no launch-args option, but it accepts a provider that
// returns a DevTools endpoint, so WebGL apps (spot-fetch, spot-light-hd) render at full speed
// instead of in software. Used for the apps listed in GPU_APPS in e2e.config.ts.
import { chromium } from 'playwright-core';
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const procs = new Map<string, { p: ChildProcess; dir: string }>();

export const gpuChromium = {
  name: 'gpu-chromium',
  scope: 'worker' as const,
  async acquire(req: { signal: AbortSignal; log(l: string): void }) {
    const dir = mkdtempSync(join(tmpdir(), 'e2e-gpu-'));
    const p = spawn(chromium.executablePath(), ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${dir}`, '--use-angle=metal', '--enable-gpu',
      '--ignore-gpu-blocklist', '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
    const endpoint = await new Promise<string>((resolve, reject) => {
      let buf = '';
      const t = setTimeout(() => reject(new Error('Chromium did not start')), 20000);
      p.stderr!.on('data', (d) => { buf += d; const m = /DevTools listening on (ws:\/\/\S+)/.exec(buf); if (m) { clearTimeout(t); resolve(m[1]); } });
      p.on('exit', (c) => reject(new Error(`Chromium exited (${c})`)));
      req.signal.addEventListener('abort', () => { p.kill(); reject(new Error('aborted')); });
    });
    const id = String(p.pid);
    procs.set(id, { p, dir });
    req.log(`gpu-chromium ${id} at ${endpoint}`);
    return { id, cdpEndpoint: endpoint };
  },
  async release(lease: { id: string }) {
    const x = procs.get(lease.id); if (!x) return;
    x.p.kill(); procs.delete(lease.id);
    setTimeout(() => rmSync(x.dir, { recursive: true, force: true }), 500);
  },
};
