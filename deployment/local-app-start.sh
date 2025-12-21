#!/bin/sh

create_env_file () {
cat <<EOF >.env
DB_HOST=db.more-cars.internal
DB_PASSWORD=123456789
EOF
}

if ! [ -f .env ]; then
  echo "⚠️ .env file is missing"
  echo "🪛 Creating a new .env file from scratch"
  create_env_file
  echo "✔️ .env file created"
  echo
fi

echo 🟢 Starting application...
node --watch --env-file=.env -r ts-node/register src/server.ts
