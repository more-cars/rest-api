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
echo "  Test version: $TEST_VERSION"
echo "  API URL: $API_URL"
echo "  Reports enabled: $REPORTS_ENABLED"
echo "  Reports path: $REPORTS_PATH"
echo ----------------------------------------------------------

if [ "$TEST_RUNNER" = local ]; then
  cd "$SCRIPT_PATH"/bruno || exit
  if [ "$REPORTS_ENABLED" = true ]; then
    mkdir -p "$REPORTS_PATH"
    npx bru run --sandbox=developer --env "$TARGET_CLUSTER"-"$TARGET_ENVIRONMENT" --reporter-json "$REPORTS_PATH"/report.json --reporter-junit "$REPORTS_PATH"/report.xml --reporter-html "$REPORTS_PATH"/report.html
  else
    npx bru run --sandbox=developer --env "$TARGET_CLUSTER"-"$TARGET_ENVIRONMENT"
  fi
fi
