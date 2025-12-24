#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

echo Adding hostnames for local dev environment...

if ! getent hosts api.more-cars.internal >/dev/null 2>&1; then
  sudo "$(which node)" -r ts-node/register "$SCRIPT_PATH"/lib/addHostname.ts api.more-cars.internal 127.0.0.1
fi

if ! getent hosts swagger.more-cars.internal >/dev/null 2>&1; then
  sudo "$(which node)" -r ts-node/register "$SCRIPT_PATH"/lib/addHostname.ts swagger.more-cars.internal 127.0.0.1
fi

if ! getent hosts db.more-cars.internal >/dev/null 2>&1; then
  sudo "$(which node)" -r ts-node/register "$SCRIPT_PATH"/lib/addHostname.ts db.more-cars.internal 127.0.0.1
fi
