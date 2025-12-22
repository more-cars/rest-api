#!/bin/sh

SERVICE_NAME=$1
K8S_NAMESPACE=$2
CERT_PATH=$3

kubectl get secret certificate-$SERVICE_NAME \
  --namespace=$K8S_NAMESPACE \
  >/dev/null 2>&1

if [ $? -eq 0 ]; then
  exit # aborting, because secret already exists
fi

kubectl create secret tls certificate-$SERVICE_NAME \
  --cert="$CERT_PATH"/tls.crt \
  --key="$CERT_PATH"/tls.key \
  --namespace=$K8S_NAMESPACE\
  >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo ✔️ Certificate stored as kubernetes secret »certificate-$SERVICE_NAME« in namespace »$K8S_NAMESPACE«
fi
