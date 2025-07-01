#!/bin/sh

minikube start --memory 4000 --cpus 2 -p morecars
minikube addons enable metrics-server -p morecars
minikube dashboard -p morecars
