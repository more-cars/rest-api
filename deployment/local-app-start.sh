#!/bin/sh

echo Starting application...

node --watch --env-file=.env -r ts-node/register src/server.ts
