#!/bin/sh

# determining the path to this script,
# to find the kubernetes scripts,
# so this script can be called from any folder
SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

# connecting to the Google Cloud and selecting the correct cluster
gcloud auth login
gcloud config set project more-cars
gcloud container clusters get-credentials more-cars --region=europe-west1-b

# the previous command already selects the correct context, but only implicitly
kubectl config use-context gke_more-cars_europe-west1-b_more-cars

# making sure we are in the correct namespace
kubectl config set-context --current --namespace=$1

# letting "kustomize" assemble all snippets into a whole kubernetes configuration
# and then rolling it out
kubectl apply -k $SCRIPT_PATH/overlays/$1
