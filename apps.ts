import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';

const H = process.env.E2E_PROJECTS_DIR ?? homedir();
const any = 'http://127.0.0.1:0';

// Serve a folder as-is; port 0 lets the runner pick a free one.
const stat = (dir: string) => ({
  url: any,
  command: { executable: 'python3', args: ['-m', 'http.server', '{port}', '--bind', '127.0.0.1', '-d', `${H}/${dir}`] },
});
// Serve an app's existing build with its own Vite (keeps its headers and base path).
const vitePreview = (dir: string) => ({
  url: any,
  command: { executable: `${H}/${dir}/node_modules/.bin/vite`, args: ['preview', '--port', '{port}', '--strictPort', '--host', '127.0.0.1'], cwd: `${H}/${dir}` },
});
const node = (dir: string, script: string, args: string[] = []) => ({
  url: any,
  command: { executable: 'node', args: [script, ...args], cwd: `${H}/${dir}`, env: { PORT: '{port}' } },
});

export const apps: Record<string, object> = {
  '8bit-player': stat('8bit-player'),
  archium: stat('archium/site'),
  audiocheck: vitePreview('audiocheck'),
  'better-photocraft': stat('Better-Photocraft-Web-claude/dist/web'),
  convert: vitePreview('convert-gitguy268'),
  'cozy-christmas-lab': stat('cozy-christmas-lab'),
  gitguy268: stat('Gitguy268.github.io'),
  glasspaint: stat('GlassPaint/_site'),
  // The export is built for basePath /ipod, so serve/ipod links to its out/ folder.
  ipod: stat('e2e-suite/serve'),
  // Never point this at the real library: LIQUIDFRAME_DATA keeps the run in a scratch folder.
  liquidframe: {
    url: any,
    command: {
      executable: `${H}/liquidframe/.venv/bin/python`,
      args: ['-m', 'liquidframe', '--no-browser', '--port', '{port}'],
      cwd: `${H}/liquidframe`,
      // Fixed on purpose: never take this from the shell, where it may name the real library.
      env: { LIQUIDFRAME_DATA: join(tmpdir(), 'e2e-suite-liquidframe') },
    },
  },
  mp4: stat('mp4'),
  openfinder: node('openfinder', 'bin/openfinder.mjs', ['--port', '{port}']),
  pikado: vitePreview('pikado'),
  qrer: { url: any, command: { executable: 'python3', args: ['serve.py', '--port', '{port}'], cwd: `${H}/qrer` } },
  'rubber-hose-revue': stat('rubber-hose-revue'),
  // Fresh scratch home and file keyring every run; the token is fixed so the test can open the UI.
  skyhold: {
    url: any,
    command: {
      executable: 'sh',
      args: ['-c', `rm -rf "$SKYHOLD_HOME" && exec ${H}/skyhold/dist/skyhold serve --addr 127.0.0.1:$PORT`],
      env: { PORT: '{port}', SKYHOLD_HOME: join(tmpdir(), 'e2e-suite-skyhold'), SKYHOLD_KEYRING: 'file', SKYHOLD_TOKEN: 'e2e' },
    },
  },
  'spot-apporteren': stat('spot-apporteren'),
  'spot-fetch': vitePreview('spot-fetch'),
  'spot-light': stat('spot-light'),
  'spot-snake': stat('spot-snake'),
  tabshell: node('tabshell', 'server.mjs'),
  textarea: node('textarea/textarea-master-claude', 'tests/serve.js'),
  'usa-website': stat('usa-website'),
  vinyl: stat('vinyl-player-realistic-map/realistic-vinyl-player-claude-html-1'),
  web2app: node('web2app', 'server.js'),
  win97: vitePreview('win97-excalidraw-claude'),
};
