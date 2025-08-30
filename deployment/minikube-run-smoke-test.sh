#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context morecars

# switching to the correct namespace
kubectl config set-context --current --namespace=$1

# starting the job
kubectl apply -k "$SCRIPT_PATH"/overlays/"$1"/jobs/smoke-test

# waiting for the job to complete
echo waiting for job to finish...
kubectl wait --for=condition=complete job/"$2"

# logging the results of the job
kubectl describe job/"$2"
