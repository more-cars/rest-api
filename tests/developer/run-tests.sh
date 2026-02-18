#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
npx ts-node "$SCRIPT_PATH"/lib/collect-test-run-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Running developer tests:
echo "  Test Runner: $TEST_RUNNER"
echo "  Target cluster: $TARGET_CLUSTER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  Test version: $TEST_VERSION"
echo "  Code coverage enabled: $CODE_COVERAGE_ENABLED"
echo "  Reports path: $REPORTS_PATH"
echo ----------------------------------------------------------

if [ "$TEST_RUNNER" = local ]; then
  if [ "$CODE_COVERAGE_ENABLED" = true ]; then
    npx vitest run -c tests/developer/vite.config.ts --coverage
  else
    npx vitest run -c tests/developer/vite.config.ts
  fi
elif [ "$TEST_RUNNER" = minikube ]; then
  JOB_NAME=developer-tests-$(date +%s)
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$JOB_NAME" "$TEST_VERSION"
  kubectl config use-context morecars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/../../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/developer-tests
  kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=5m
  kubectl describe job/"$JOB_NAME"
elif [ "$TEST_RUNNER" = gke ]; then
  JOB_NAME=developer-tests-$(date +%s)
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts "$JOB_NAME" "$TEST_VERSION"
  gcloud container clusters get-credentials more-cars --region=europe-west1-b
  kubectl config use-context gke_more-cars_europe-west1-b_more-cars
  kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
  kubectl apply -k "$SCRIPT_PATH"/../../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/developer-tests
  kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=30m
  kubectl describe job/"$JOB_NAME"
fi
