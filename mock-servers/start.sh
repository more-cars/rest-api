#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

TS_NODE_PROJECT=tsconfig.json node -r ts-node/register "$SCRIPT_PATH"/lib/mockServerFlickr.ts &
TS_NODE_PROJECT=tsconfig.json node -r ts-node/register "$SCRIPT_PATH"/lib/mockServerWikimedia.ts &
TS_NODE_PROJECT=tsconfig.json node -r ts-node/register "$SCRIPT_PATH"/lib/mockServerYouTube.ts
