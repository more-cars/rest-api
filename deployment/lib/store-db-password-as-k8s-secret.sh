#!/bin/sh

db_password=$1
namespace=$2

kubectl get secret db-credentials \
  --namespace=$namespace \
  >/dev/null 2>&1

if [ $? -eq 0 ]; then
  exit # aborting, because secret already exists
fi

kubectl create secret generic db-credentials \
  --from-literal=password=$db_password \
  --namespace=$namespace \
  >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo ✔️ Database password stored as kubernetes secret »db-credentials« in namespace »$namespace«
fi
