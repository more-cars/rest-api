#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

TARGET_ENVIRONMENT=$1
MINIKUBE_IP=$(minikube ip -p morecars)

if ! getent hosts api."$TARGET_ENVIRONMENT".more-cars.internal >/dev/null 2>&1; then
  sudo "$(which node)" -r ts-node/register "$SCRIPT_PATH"/lib/addHostname.ts api."$TARGET_ENVIRONMENT".more-cars.internal $MINIKUBE_IP
fi

if ! getent hosts swagger."$TARGET_ENVIRONMENT".more-cars.internal >/dev/null 2>&1; then
  sudo "$(which node)" -r ts-node/register "$SCRIPT_PATH"/lib/addHostname.ts swagger."$TARGET_ENVIRONMENT".more-cars.internal $MINIKUBE_IP
fi

if ! getent hosts db."$TARGET_ENVIRONMENT".more-cars.internal >/dev/null 2>&1; then
  sudo "$(which node)" -r ts-node/register "$SCRIPT_PATH"/lib/addHostname.ts db."$TARGET_ENVIRONMENT".more-cars.internal $MINIKUBE_IP
fi
