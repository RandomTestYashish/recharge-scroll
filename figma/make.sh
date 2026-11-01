#!/bin/sh
# Rebuild index.html + screen.css. Needs Node (~/.local/node) and the Tailwind v4 CLI (any install; set TAILWIND).
export PATH=~/.local/node/node-v22.23.4-darwin-arm64/bin:$PATH
: "${TAILWIND:=/private/tmp/claude-501/-Users-panda/7c3c046b-f900-4257-8868-684d39acf976/scratchpad/tw/node_modules/.bin/tailwindcss}"
export TAILWIND NODE_PATH="$(dirname "$(dirname "$TAILWIND")")"
python3 "$(dirname "$0")/build.py"
