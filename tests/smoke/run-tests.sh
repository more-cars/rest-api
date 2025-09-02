#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
npx ts-node "$SCRIPT_PATH"/lib/collect-test-run-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Running smoke tests:
echo "  Test Runner: $TEST_RUNNER"
echo "  Target cluster: $TARGET_CLUSTER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  API URL: $API_URL"
echo "  Reports enabled: $REPORTS_ENABLED"
echo "  Reports path: $REPORTS_PATH"
echo ----------------------------------------------------------

if [ "$TEST_RUNNER" = local ]; then
  cd "$SCRIPT_PATH"/../../bruno || exit
  if [ "$REPORTS_ENABLED" = true ]; then
    mkdir -p "$REPORTS_PATH"
    npx bru run --env "$TARGET_CLUSTER"-"$TARGET_ENVIRONMENT" --reporter-json "$REPORTS_PATH"/report.json --reporter-junit "$REPORTS_PATH"/report.xml --reporter-html "$REPORTS_PATH"/report.html
  else
    npx bru run --env "$TARGET_CLUSTER"-"$TARGET_ENVIRONMENT"
  fi
elif [ "$TEST_RUNNER" = minikube ]; then
  JOB_NAME=smoke-test-$(date +%s)
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$JOB_NAME"
  kubectl config use-context morecars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/../../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/smoke-test
  kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=1m
  kubectl describe job/"$JOB_NAME"
elif [ "$TEST_RUNNER" = gke ]; then
  JOB_NAME=smoke-test-$(date +%s)
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$JOB_NAME"
  gcloud container clusters get-credentials more-cars --region=europe-west1-b
  kubectl config use-context gke_more-cars_europe-west1-b_more-cars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/../../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/smoke-test
  kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=5m
  kubectl describe job/"$JOB_NAME"
fi
