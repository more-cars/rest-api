#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")/$1

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context morecars

# creating database volume
kubectl apply -f $SCRIPT_PATH/db-mc1-pvc.yaml

# creating More Cars 1.0 database
kubectl apply -f $SCRIPT_PATH/db-mc1-deployment.yaml
kubectl apply -f $SCRIPT_PATH/db-mc1-service.yaml
