#!/bin/sh

echo Adding hostnames...

sudo "$(which node)" -r ts-node/register deployment/lib/addHostname.ts
