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
echo "  Target database: $DB_HOST"
echo "  Data type: $MIGRATE_DATA_TYPE"
echo "  Node type: $MIGRATE_NODE_TYPE"
echo "  Delete old data: $DELETE_EXISTING_DATA"
echo ----------------------------------------------------------

if [ "$MIGRATION_RUNNER" = local ]; then
  if [ "$MIGRATE_DATA_TYPE" = nodes ]; then
    node -r ts-node/register migration/migrate-nodes.ts
  elif [ "$MIGRATE_DATA_TYPE" = relationships ]; then
    node -r ts-node/register migration/migrate-relationships.ts
  fi
elif [ "$MIGRATION_RUNNER" = minikube ]; then
  if [ "$MIGRATE_DATA_TYPE" = nodes ]; then
    JOB_NAME=migrate-nodes-$(date +%s)
    npx ts-node "$SCRIPT_PATH"/lib/create-patch-file_nodes.ts "$JOB_NAME" "Company" "true"
    kubectl config use-context morecars
    kubectl config set-context --current --namespace="$TARGET_ENVIRONMENT"
    kubectl apply -k "$SCRIPT_PATH"/../deployment/overlays/"$TARGET_ENVIRONMENT"/jobs/migrate-nodes
    kubectl wait --for=condition=complete job/"$JOB_NAME" --timeout=60m
    kubectl describe job/"$JOB_NAME"
  fi
fi
