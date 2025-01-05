#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

# creating a namespace
kubectl apply -f $SCRIPT_PATH/namespace.yaml
kubectl config set-context --current --namespace=dev

# creating the database
kubectl apply -f $SCRIPT_PATH/db-deployment.yaml
kubectl apply -f $SCRIPT_PATH/db-service.yaml

# creating the app
kubectl apply -f $SCRIPT_PATH/app-deployment.yaml
kubectl apply -f $SCRIPT_PATH/app-service.yaml

# creating the Open API specification
kubectl apply -f $SCRIPT_PATH/openapi-deployment.yaml
kubectl apply -f $SCRIPT_PATH/openapi-service.yaml
