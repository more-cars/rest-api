#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
NODE_OPTIONS='--disable-warning=ExperimentalWarning' npx ts-node "$SCRIPT_PATH"/lib/collect-test-run-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Running performance tests:
echo "  Test Runner: $TEST_RUNNER"
echo "  Target cluster: $TARGET_CLUSTER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  Environment URL: $API_URL"
echo "  Test scenario: $SCENARIO"
echo "  Report enabled: $K6_WEB_DASHBOARD"
echo "  Report path: $REPORT_PATH"
echo "  Report filename: $REPORT_FILENAME"
echo "  Exporting dashboard to: $K6_WEB_DASHBOARD_EXPORT"
echo "  Opening dashboard in browser: $K6_WEB_DASHBOARD_OPEN"
echo "  Dashboard refresh rate: $K6_WEB_DASHBOARD_PERIOD"
echo ----------------------------------------------------------

if [ "$TEST_RUNNER" = local ]; then
  if [ "$K6_WEB_DASHBOARD" ]; then
    mkdir -p "$REPORT_PATH"
  fi
  k6 run "$SCRIPT_PATH"/scenarios/"$SCENARIO"
elif [ "$TEST_RUNNER" = minikube ]; then
  JOB_NAME=performance-test-$(date +%s)
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$JOB_NAME"
  kubectl config use-context morecars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/../../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/performance-test
  kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=6m
  kubectl describe job/"$JOB_NAME"
elif [ "$TEST_RUNNER" = gke ]; then
  JOB_NAME=performance-test-$(date +%s)
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$JOB_NAME"
  gcloud container clusters get-credentials more-cars --region=europe-west1-b
  kubectl config use-context gke_more-cars_europe-west1-b_more-cars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/../../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/performance-test
  kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=10m
  kubectl describe job/"$JOB_NAME"
fi
