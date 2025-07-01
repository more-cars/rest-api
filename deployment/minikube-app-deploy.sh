#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")/$1

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context morecars

# creating a namespace
kubectl apply -f $SCRIPT_PATH/namespace.yaml
kubectl config set-context --current --namespace=$1

# creating the database
kubectl apply -f $SCRIPT_PATH/db-deployment.yaml
kubectl apply -f $SCRIPT_PATH/db-service.yaml

# creating the app
kubectl apply -f $SCRIPT_PATH/api-deployment.yaml
kubectl apply -f $SCRIPT_PATH/api-service.yaml

# creating the Open API specification
kubectl apply -f $SCRIPT_PATH/openapi-spec-deployment.yaml
kubectl apply -f $SCRIPT_PATH/openapi-spec-service.yaml
