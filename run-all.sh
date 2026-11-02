#!/bin/sh
# Runs each app's smoke test in turn; one app failing doesn't stop the rest.
# Usage: ./run-all.sh [app ...]   (default: every app in apps.ts)
cd "$(dirname "$0")" || exit 1
export E2E_TELEMETRY_DISABLED=1
mkdir -p .e2e
apps=${*:-$(node -e "import('./apps.ts').then(m => console.log(Object.keys(m.apps).join(' ')))")}
for a in $apps; do
  APP=$a npx e2e run > ".e2e/$a.log" 2>&1 && s=PASS || { s="FAIL ($?) see .e2e/$a.log"; }
  printf '%-18s %s\n' "$a" "$s"
done | tee .e2e/results.txt
grep -q FAIL .e2e/results.txt && exit 1 || exit 0
