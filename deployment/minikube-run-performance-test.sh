#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")/$1

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context morecars

# switching to the correct namespace
kubectl config set-context --current --namespace=$1

# starting the tests (replacing the previous job if there was already one)
kubectl replace --force -f $SCRIPT_PATH/performance-test-job.yaml
