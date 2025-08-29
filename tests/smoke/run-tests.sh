#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
NODE_OPTIONS='--disable-warning=ExperimentalWarning' npx ts-node "$SCRIPT_PATH"/lib/collect-test-run-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Running smoke tests:
echo "  Test Runner: $TEST_RUNNER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  API URL: $API_URL"
echo ----------------------------------------------------------

if [ "$TEST_RUNNER" = local ]; then
  cd "$SCRIPT_PATH"/../../bruno || exit
  bru run --env "$TARGET_ENVIRONMENT"
elif [ "$TEST_RUNNER" = minikube ]; then
  npx ts-node "$SCRIPT_PATH"/lib/create-patch-file.ts
  cd "$SCRIPT_PATH"/../../deployment/ || exit
  NAMESPACE=$(echo "$TARGET_ENVIRONMENT" | sed 's/minikube-//g')
  ./minikube-run-smoke-test.sh "${NAMESPACE}"
elif [ "$TEST_RUNNER" = gke ]; then
  echo "not implemented yet"
fi
