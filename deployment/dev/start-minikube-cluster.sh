#!/bin/sh

minikube start --memory 4000 --cpus 2 -p mc-api
minikube addons enable metrics-server -p mc-api
minikube dashboard -p mc-api
