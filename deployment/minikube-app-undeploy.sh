#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")/$1

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context mc-api

# deleting the namespace, incl. all deployments, services and jobs
kubectl delete namespace $1
