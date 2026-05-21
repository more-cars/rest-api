#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

node -r ts-node/register "$SCRIPT_PATH"/lib/mockServerFlickr.ts &
node -r ts-node/register "$SCRIPT_PATH"/lib/mockServerWikimedia.ts &
node -r ts-node/register "$SCRIPT_PATH"/lib/mockServerYouTube.ts
