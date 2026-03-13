#!/bin/sh

minikube start --memory 8000 --cpus 2 -p morecars
minikube addons enable metrics-server -p morecars
minikube dashboard -p morecars &

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
"$SCRIPT_PATH"/forward-neo4j-ports.sh
