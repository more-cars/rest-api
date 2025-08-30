#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context morecars

# making sure we are in the correct namespace
kubectl config set-context --current --namespace="$1"

# letting "kustomize" assemble all snippets into a whole kubernetes configuration
# and then rolling it out
kubectl apply -k "$SCRIPT_PATH"/jobs/mc1
