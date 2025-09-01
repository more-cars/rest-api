#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
npx ts-node "$SCRIPT_PATH"/lib/collect-deployment-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Deploying app with following configuration:
echo "  Target cluster: $TARGET_CLUSTER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  Target version: $TARGET_VERSION"
echo ----------------------------------------------------------

if [ "$TARGET_CLUSTER" = minikube ]; then
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$TARGET_VERSION"
  kubectl config use-context morecars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/overlays/"$TARGET_ENVIRONMENT"/app
elif [ "$TARGET_CLUSTER" = gke ]; then
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$TARGET_VERSION"
  gcloud container clusters get-credentials more-cars --region=europe-west1-b
  kubectl config use-context gke_more-cars_europe-west1-b_more-cars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/overlays/"$TARGET_ENVIRONMENT"/app
fi
