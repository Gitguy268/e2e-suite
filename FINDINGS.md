# e2e smoke suite: findings (updated 2026-11-16)

Run: `./run-all.sh` (or `./run-all.sh qrer tabshell`). Watch one: `APP=qrer npx e2e run --headed`.
Each test serves the app's existing build on a free port, opens it in headless Chromium,
checks the title or a key element, does one first interaction, checks that it changed something,
and fails on any uncaught JS error (`errors.js` → `window.__errs`).

## Result 2026-11-16: 30 pass, 1 skipped (about 3 minutes, e2e 0.23.0, @e2e-dev/web 0.15.3)

- **Added:** spot-light-hd, web-pak, flashnack, lvw-bench (the leaderboard in `LvW-bench/web`) and
  retrofind. All pass.
- **Skipped:** textarea. `~/textarea` is no longer on disk (it was published on 2026-11-10 and the
  local folder has since gone), so `run-all.sh` reports it as SKIP instead of failing. Clone it next
  to this folder to test it again.
- **Not added, because they are no longer on disk:** edu-code-camp, stem-player and retro-zip.
- **Fixed in the suite, not the app:** openfinder's build of 2026-11-01 opens on "All" instead of the
  Sandbox, so the test now clicks Sandbox first.
- **GPU:** spot-fetch and spot-light-hd now run in Chromium with the real GPU through
  `gpu-provider.ts`, a browser provider for `web()` (it still has no launch-flags option). spot-fetch's
  long software-WebGL timeouts are gone.

### 2026-10-18 result: 25 / 25 pass (skyhold added 2026-10-26 and passed on its own)

8bit-player, audiocheck, better-photocraft, convert, cozy-christmas-lab, gitguy268,
glasspaint, hillium, ipod, liquidframe (also covers openphoto), mp4, openfinder, pikado, qrer,
rubber-hose-revue, skyhold, spot-apporteren, spot-fetch, spot-light, spot-snake, tabshell, textarea,
usa-website, vinyl, web2app, win97.

## App bugs found

None. Every failure on the first run was a mistake in the test (wrong text, an ambiguous
button, a hero that starts hidden), not in an app.

## Worth knowing per app

- **spot-fetch, spot-light-hd:** in software WebGL a frame took about 1.5 s; with the real GPU
  (`gpu-provider.ts`, `--use-angle=metal`) they respond at once. spot-light-hd paints its textures
  and compiles shaders at startup, so its test waits for the loading screen before anything else.
- **web-pak:** checks that the built `app/` starts and that a tool works. Its own repo has a
  Playwright test that compresses, opens, previews and extracts archives.
- **retrofind:** `server.py` is pointed at a SearXNG address nothing listens on, and the test only
  types a query, so it never searches and never touches the real SearXNG agent.
- **lvw-bench:** serves the static leaderboard (`LvW-bench/web`); the browser runner needs a model
  download and isn't covered.
- **ipod:** tested from its static export `out/` (served at `/ipod` via `serve/ipod`, a
  symlink). `next dev` was dropped because it rewrites `next-env.d.ts` in the repo.
- **liquidframe:** always runs on a throwaway library in `$TMPDIR/e2e-suite-liquidframe`,
  never on `.openphoto-data`.
- **web2app:** the test fills the URL field only. It never presses Build.
- **mp4, tabshell:** mp4 loads gsap from jsdelivr, so it fails offline. tabshell's VM boot
  works offline, but networking inside the VM does not.
- **skyhold** (added 2026-10-26): runs `~/skyhold/dist/skyhold serve`, so rebuild it first
  (`go build -o dist/skyhold ./cmd/skyhold`). Each run wipes `$TMPDIR/e2e-suite-skyhold` and
  uses the file keyring, so the real keychain is never touched. `SKYHOLD_TOKEN=e2e` fixes the
  URL token. The test only sets up a password; it never adds files or releases anything.
- **better-photocraft:** only checks that the loading screen goes away and the canvas shows.
  It is egui on a canvas, with no DOM controls to drive.

## Limits

- Tests run against the builds already on disk (`dist/`, `out/`, `_site/`), not the source.
  Rebuild an app first if you changed it. On 2026-10-18 only Better-Photocraft had a source
  file newer than its build.
- Smoke depth only: one interaction per app. The repos' own Playwright suites go deeper.
- Not covered: native apps (videoina, container, superfile, pakket, opencode CLI), model folders,
  apps that only do something with a model engine and a downloaded model (LvW-harness, usb-llms), and older copies (Better-Photocraft-Web-opencode,
  win97-excalidraw, other vinyl copies).
- An app whose folder is missing is skipped, not failed: `run-all.sh` checks the folder in `needs`
  (apps.ts) first.
- e2e is pre-1.0 (0.23.0), so a minor update can change the config API. Telemetry is off in `run-all.sh`.
