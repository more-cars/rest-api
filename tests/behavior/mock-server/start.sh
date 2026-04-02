#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

echo 🟢 Starting YouTube API mock server...

node --env-file=.env -r ts-node/register "$SCRIPT_PATH"/lib/mockServerYouTube.ts
