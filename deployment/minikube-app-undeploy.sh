#!/bin/sh

# making sure we are actually in the Minikube cluster, not in the Google cluster
kubectl config use-context morecars

# deleting the namespace, incl. all deployments, services and jobs
kubectl delete namespace "$1"
