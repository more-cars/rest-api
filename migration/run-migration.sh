#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
TEMPORARY_ENV_FILE=env.sh
npx ts-node "$SCRIPT_PATH"/lib/collect-migration-parameters.ts $TEMPORARY_ENV_FILE
. "$SCRIPT_PATH"/$TEMPORARY_ENV_FILE
rm "$SCRIPT_PATH"/env.sh

echo ----------------------------------------------------------
echo Running migration:
echo "  Migration runner: $MIGRATION_RUNNER"
echo "  Target cluster: $TARGET_CLUSTER"
echo "  Target environment: $TARGET_ENVIRONMENT"
echo "  Source database: $DB_MC1_HOST"
echo "  DB password (new): *****"
echo "  Target database: $DB_HOST"
echo "  DB password (old): *****"
echo "  Data type: $DATA_TYPE"
echo ----------------------------------------------------------

if [ "$MIGRATION_RUNNER" = local ]; then
  if [ "$DATA_TYPE" = nodes ]; then
    node -r ts-node/register migration/migrate-nodes.ts
  elif [ "$DATA_TYPE" = relationships ]; then
    node -r ts-node/register migration/migrate-relationships.ts
  fi
fi
