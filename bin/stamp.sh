#!/usr/bin/env bash
# Stamp a build id into portal.html and version.json so the page can detect that
# a newer build exists and reload itself. GitHub Pages caches HTML aggressively
# and we cannot set response headers on it, so the page has to self-check.
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$(date -u +%Y%m%d-%H%M%S)"
printf '{"build":"%s"}\n' "$ID" > version.json
python3 - "$ID" <<'PY'
import re,sys
bid=sys.argv[1]; p='app/portal.html'; s=open(p).read()
if re.search(r"window\.__BUILD_ID\s*=\s*'", s):   # the ASSIGNMENT, not the comparison
    s=re.sub(r"window\.__BUILD_ID\s*=\s*'[^']*'", f"window.__BUILD_ID = '{bid}'", s, count=1)
else:
    s=s.replace('<head>', f"<head>\n<script>window.__BUILD_ID = '{bid}';</script>", 1)
open(p,'w').write(s)
print('stamped', bid)
PY
