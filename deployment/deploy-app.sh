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
echo "  Package name: $PACKAGE_NAME"
echo "  Package version: $PACKAGE_VERSION"
echo ----------------------------------------------------------

if [ "$TARGET_CLUSTER" = minikube ]; then
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts
  kubectl config use-context morecars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/overlays/"$TARGET_ENVIRONMENT"/app

  # storing the passwords and certificates as kubernetes secrets (if they don't exist yet)
  "$SCRIPT_PATH"/lib/store-db-password-as-k8s-secret.sh 123456789 "$TARGET_ENVIRONMENT"
  "$SCRIPT_PATH"/lib/store-certificate-as-k8s-secret.sh api "$TARGET_ENVIRONMENT" "$SCRIPT_PATH"/dummy-certs
  "$SCRIPT_PATH"/lib/store-certificate-as-k8s-secret.sh db "$TARGET_ENVIRONMENT" "$SCRIPT_PATH"/dummy-certs
elif [ "$TARGET_CLUSTER" = gke ]; then
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts
  gcloud container clusters get-credentials more-cars --region=europe-west1-b
  kubectl config use-context gke_more-cars_europe-west1-b_more-cars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/overlays/"$TARGET_ENVIRONMENT"/app
fi
