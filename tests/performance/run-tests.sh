#!/bin/bash

SCRIPTS_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
TEMPORARY_ENV_FILE=env.sh
npx ts-node "$SCRIPTS_DIR"/lib/collect-test-run-parameters.ts $TEMPORARY_ENV_FILE
source "$SCRIPTS_DIR"/$TEMPORARY_ENV_FILE
rm "$SCRIPTS_DIR"/env.sh

echo ----------------------------------------------------------
echo Running performance tests
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  Environment URL: $API_URL"
echo "  Test scenario: $TEST_FILE_PATH"
echo "  Dashboard enabled: $K6_WEB_DASHBOARD"
echo "  Exporting dashboard to: $K6_WEB_DASHBOARD_EXPORT"
echo "  Opening dashboard in browser: $K6_WEB_DASHBOARD_OPEN"
echo "  Dashboard refresh rate: $K6_WEB_DASHBOARD_PERIOD"
echo ----------------------------------------------------------

k6 run "$TEST_FILE_PATH"
