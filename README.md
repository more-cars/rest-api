# More Cars - REST API

## Quickstart

* Install Node.js and npm
* Clone repository: https://github.com/more-cars/rest-api.git
* run `npm install`
* run `npm start`

## Minikube

* run `install:minikube` to install the latest version of minikube
    * requires sudo privileges
    * can be run multiple times
        * if a newer version is available it will be installed
* run `start:minikube` to start the minikube cluster
    * this should open the kubernetes dashboard in the browser
* run `stop:minikube` to stop the minikube cluster
    * can also be achieved by aborting the `start:minikube` terminal (`ctrl` + `c` or `command` + `c`)
* run `delete:minikube` to destroy the minikube cluster
    * a new one can be created with `start:minikube`
    * changes to the memory or cpu settings require a "delete"

## API specification

Every REST API endpoint is documented in an _OpenAPI_ file.
It can be found in the `specification` folder in the project's
root directory.
To verify that the specification is a valid OpenAPI document, the command `npm run validate-api-schema` can be executed. 