#!/bin/sh

# making sure we are actually in the Google cluster, not in the Minikube cluster
kubectl config use-context gke_more-cars_europe-west1-b_more-cars

# deleting the namespace, incl. all deployments, services and jobs
kubectl delete namespace "$1"
