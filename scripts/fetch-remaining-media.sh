#!/usr/bin/env bash
# Fetch remaining batch-2 timeline images from Wikimedia Commons.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/media/timeline"
UA="Techline/1.0 (timeline image seed; https://github.com/techline)"

mkdir -p "$DEST"

download() {
  local file="$1"
  local url="$2"
  local out="$DEST/$file"

  if [[ -f "$out" ]] && [[ $(wc -c <"$out") -gt 0 ]]; then
    echo "skip $file"
    return 0
  fi

  for attempt in 1 2 3 4 5; do
    if curl -fsSL -A "$UA" -o "$out" "$url"; then
      echo "ok $file ($(wc -c <"$out") bytes)"
      return 0
    fi
    rm -f "$out"
    local wait=$((attempt * 15))
    echo "retry $file (attempt $attempt, wait ${wait}s)..."
    sleep "$wait"
  done

  echo "fail $file" >&2
  return 1
}

# shellcheck disable=SC2016
entries=(
  'tony-hoare-quicksort-published.jpg|https://upload.wikimedia.org/wikipedia/commons/2/2c/Sir_Tony_Hoare_IMG_5125.jpg'
  'jean-sammet-formac-published.jpg|https://upload.wikimedia.org/wikipedia/commons/1/1f/Jean_Sammet_UMD_1979.jpg'
  'ascii-standard-published.svg|https://upload.wikimedia.org/wikipedia/commons/1/1b/ASCII-Table-wide.svg'
  'sketchpad-created.jpg|https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/SketchpadDissertation-Fig1-2.tif/1280px-SketchpadDissertation-Fig1-2.tif.jpg'
  'ibm-system-360-announced.jpg|https://upload.wikimedia.org/wikipedia/commons/b/b5/IBM_System_360_model_30_profile.agr.jpg'
  'basic-first-run.png|https://upload.wikimedia.org/wikipedia/commons/1/19/Green_bottles_BASIC.png'
  'seymour-cray-cdc-6600.png|https://upload.wikimedia.org/wikipedia/commons/b/be/CDC_6600_Overview.png'
  'dec-pdp-8-shipped.jpg|https://upload.wikimedia.org/wikipedia/commons/6/6b/PDP-8_%281%29.jpg'
  'gordon-moore.jpg|https://upload.wikimedia.org/wikipedia/commons/1/1d/Former_Intel_CEO_Gordon_Moore_in_his_cubicle.jpg'
  'dec-pdp-10-released.jpg|https://upload.wikimedia.org/wikipedia/commons/1/17/DEC_PDP-10_%28from_ca._1970_named_decsystem-10%29_mainframe_computer_system%2C_1970s_%28edited%2C_white_background%29.jpg'
  'eliza-created.jpg|https://upload.wikimedia.org/wikipedia/commons/4/4e/ELIZA_conversation.jpg'
  'simula-67-presented.svg|https://upload.wikimedia.org/wikipedia/commons/d/d9/Simula_-_logo.svg'
  'knuth-taocp-volume-1-published.jpg|https://upload.wikimedia.org/wikipedia/commons/a/a5/Donald_Ervin_Knuth_%28cropped%29.jpg'
  'edsger-dijkstra.jpg|https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg'
  'moore-noyce-intel-founded.png|https://upload.wikimedia.org/wikipedia/commons/6/60/Gordon_Moore_and_Robert_Noyce_at_Intel_in_1970.png'
  'unix-created.svg|https://upload.wikimedia.org/wikipedia/commons/7/77/Unix_history-simple.svg'
  'margaret-hamilton-apollo-software.jpg|https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg'
  'arpanet-first-message.png|https://upload.wikimedia.org/wikipedia/commons/b/bf/Arpanet_logical_map%2C_march_1977.png'
  'niklaus-wirth.jpg|https://upload.wikimedia.org/wikipedia/commons/4/49/Niklaus_Wirth%2C_UrGU.jpg'
  'stephen-cook-np-completeness.jpg|https://upload.wikimedia.org/wikipedia/commons/6/68/Prof.Cook.jpg'
  'phone-phreaking-esquire-article.jpg|https://upload.wikimedia.org/wikipedia/commons/5/5f/Blue_Box_in_museum.jpg'
  'intel-4004-introduced.jpg|https://upload.wikimedia.org/wikipedia/commons/5/52/Intel_4004.jpg'
)

failed=0
for entry in "${entries[@]}"; do
  file="${entry%%|*}"
  url="${entry#*|}"
  download "$file" "$url" || failed=$((failed + 1))
  sleep 1
done

echo "Done. Failed: $failed"
exit "$failed"
