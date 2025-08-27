#!/bin/bash

if [ -n "$1" ]
then
  target=$1
else
  target=$(npx -y @inquirer-cli/select -c 'local' -c 'minikube-dev' -c 'minikube-testing' -c 'minikube-prod' -c 'testing' -c 'prod' 'Target Environment?')
fi

echo -----------------------------------
echo Running smoke tests against $target
echo -----------------------------------

SCRIPTS_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd "${SCRIPTS_DIR}"/../../bruno

bru run --env $target
