#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

create_env_file () {
cat <<EOF >.env
DB_HOST=db.more-cars.internal
DB_PASSWORD=123456789
API_NAMESPACE=default
EOF
}

if ! [ -f .env ]; then
  echo "⚠️ .env file is missing"
  echo "🪛 Creating a new .env file from scratch"
  create_env_file
  echo "✔️ .env file created"
  echo
fi

hostname_exists() {
  if ! getent hosts $1 >/dev/null 2>&1; then
      RED='\033[0;33m'
      NC='\033[0m'
      echo ⚠️ Hostname ${RED}$1${NC} was not found in the environment. Consider running ${RED}npm run local:hostnames:add${NC}.
  fi
}

hostname_exists "api.more-cars.internal"
hostname_exists "db.more-cars.internal"

echo 🟢 Starting application...
TS_NODE_PROJECT=tsconfig.app.json node --watch --env-file=.env -r ts-node/register src/server.ts
