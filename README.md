# More Cars - REST API

## Quickstart

* Install Node.js and npm
* Clone repository: https://github.com/more-cars/rest-api.git
* run `npm install`
* run `npm start`

## Minikube

* run `npm run minikube:install` to install the latest version of minikube
    * requires sudo privileges
    * can be run multiple times
        * if a newer version is available it will be installed
* run `npm run minikube:start` to start a local minikube cluster
    * this should open the kubernetes dashboard in the browser
* run `npm run minikube:stop` to stop the minikube cluster
    * can also be achieved by aborting the `minikube:start` terminal (`ctrl` + `c` or `command` + `c`)
* run `npm run minikube:delete` to destroy the minikube cluster
    * a new one can be created with `npm run minikube:start`
    * changes to the memory or cpu settings require a "delete"

## Start application

* run `npm run minikube:start` to start the kubernetes cluster (see [Minikube](#minikube) section)
* run `npm run app:deploy` to start the application
    * this deploys the database and starts a service to be able to connect to it
* run `npm run minikube:tunnel` to allow the database service to be accessible from outside the cluster
    * requires sudo privileges
* run `npm run app:undeploy` to remove the whole application from the cluster
    * run `npm run app:deploy` to start the application from scratch (empty database, etc.)

## API specification

Every REST API endpoint is documented in an _OpenAPI_ file.
It can be found in the `specification` folder in the project's
root directory.
To verify that the specification is a valid OpenAPI document, the command `npm run tests:validate-api-schema` can be
executed. 