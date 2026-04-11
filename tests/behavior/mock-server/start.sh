#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

node --env-file=.env -r ts-node/register "$SCRIPT_PATH"/lib/mockServerFlickr.ts &
node --env-file=.env -r ts-node/register "$SCRIPT_PATH"/lib/mockServerWikimedia.ts &
node --env-file=.env -r ts-node/register "$SCRIPT_PATH"/lib/mockServerYouTube.ts
