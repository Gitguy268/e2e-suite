# e2e smoke suite: findings (2026-10-18)

Run: `./run-all.sh` (or `./run-all.sh qrer tabshell`). Watch one: `APP=qrer npx e2e run --headed`.
Each test serves the app's existing build on a free port, opens it in headless Chromium,
checks the title or a key element, does one first interaction, checks that it changed something,
and fails on any uncaught JS error (`errors.js` → `window.__errs`).

## Result: 25 / 25 pass (about 1.5 minutes, 2026-10-18); skyhold added 2026-10-26 and passes on its own

8bit-player, archium, audiocheck, better-photocraft, convert, cozy-christmas-lab, gitguy268,
glasspaint, ipod, liquidframe (also covers openphoto), mp4, openfinder, pikado, qrer,
rubber-hose-revue, skyhold, spot-apporteren, spot-fetch, spot-light, spot-snake, tabshell, textarea,
usa-website, vinyl, web2app, win97.

## App bugs found

None. Every failure on the first run was a mistake in the test (wrong text, an ambiguous
button, a hero that starts hidden), not in an app.

## Worth knowing per app

- **spot-fetch:** headless Chromium draws its WebGL scene in software, at about 1.5 s per frame,
  so the page reads very slowly. With the real GPU (`--use-angle=metal`) it responds in 0 to 2 ms.
  This is a headless limit, not an app bug. The test uses long timeouts until e2e's `web()`
  accepts launch flags.
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
- Not covered: native apps (videoina, container, superfile, opencode CLI), model folders, and
  older copies (textarea_*, Better-Photocraft-Web-opencode, win97-excalidraw, other vinyl copies).
- e2e is pre-1.0 (0.21.2), so a minor update can change the config API. Telemetry is off in `run-all.sh`.
