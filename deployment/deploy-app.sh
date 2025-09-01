#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
npx ts-node "$SCRIPT_PATH"/lib/collect-deployment-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Deploying with folling configuration:
echo "  Target cluster: $TARGET_CLUSTER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  Target version: $TARGET_VERSION"
echo ----------------------------------------------------------

if [ "$TARGET_CLUSTER" = local ]; then
  node --watch --env-file="$SCRIPT_PATH"/../.env -r ts-node/register "$SCRIPT_PATH"/../src/server.ts
elif [ "$TARGET_CLUSTER" = minikube ]; then
  NAMESPACE=$(echo "$TARGET_ENVIRONMENT" | sed 's/minikube-//g')
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$TARGET_VERSION"
  kubectl config use-context morecars
  kubectl config set-context --current --namespace="$NAMESPACE"
  kubectl apply -k "$SCRIPT_PATH"/overlays/"$NAMESPACE"/app
elif [ "$TARGET_CLUSTER" = gke ]; then
  NAMESPACE=$(echo "$TARGET_ENVIRONMENT" | sed 's/gke-//g')
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$TARGET_VERSION"
  kubectl config use-context gke_more-cars_europe-west1-b_more-cars
  kubectl config set-context --current --namespace="$NAMESPACE"
  kubectl apply -k "$SCRIPT_PATH"/overlays/"$NAMESPACE"/app
fi
