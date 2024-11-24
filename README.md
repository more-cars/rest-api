# More Cars - REST API

## Quickstart

* Install Node.js and npm
* Clone repository: https://github.com/more-cars/rest-api.git
* run `npm install`
* run `npm run local:app:start` to start the app locally
    * it should be available at http://localhost:3000
    * see [Minikube](#minikube) section on how to run the app in a local kubernetes cluster

## Minikube

### Start cluster

* run `npm run minikube:install` to install the latest version of minikube
    * requires sudo privileges
    * can be run multiple times
        * if a newer version is available it will be installed
* run `npm run minikube:start` to start a local minikube cluster
    * this should open the kubernetes dashboard in the browser (~30-60 seconds)
* run `npm run minikube:stop` to stop the minikube cluster
    * can also be achieved by aborting the `minikube:start` terminal (`ctrl` + `c` or `command` + `c`)
* run `npm run minikube:delete` to destroy the minikube cluster
    * a new one can be created with `npm run minikube:start`
    * changes to the memory or cpu settings require a "delete"

### Start application

* make sure the minikube cluster is running (see [Minikube](#minikube) section)
* run `npm run docker:build-image` to crate a docker image of the application
    * the image will be built with the code that is currently on the disk
* run `npm run docker:tag-image:local` to mark this image as a (temporary) dev version
* run `npm run minikube:import-image` to push the image into the minikube cluster
* run `npm run minikube:app:deploy` to deploy and start the application
    * this deploys the app and the database
    * this also starts the necessary services to be able to connect to app and db via browser
* run `npm run minikube:open-tunnel` to allow the database service to be accessible from outside the cluster
    * requires sudo privileges
* go to the "services" section in the kubernetes dashboard
    * search for `app-dev-service`
    * the column `external endpoints` contains the URL to access the app
    * check out the URL to make sure the app is running properly
* run `npm run minikube:app:undeploy` to remove the whole application from the cluster
    * run `npm run minikube:app:deploy` to start the application from scratch again (empty database, fresh pods, etc.)

## Build application

* run `npm run docker:build-image` to create a docker image for the application
    * the resulting image can be used for local deployments or for a "real" release candidate for production

## Run tests

### Unit tests

* run `npm run tests:jest` to execute all unit tests
* run `npm run tests:jest:coverage` to additionally create a code coverage report afterward
    * the report will be stored in the `test-reports/unit` folder

### Behavior tests

* run `npm run tests:cucumber` to execute all behavior tests
* this requires a running app -> `npm run local:app:start`
* the report will be saved under `test-reports/behavior`

## Development mode

When actively developing or debugging the app it is recommended to use the command `npm run dev:app:start`
instead of the `local:app:start` script.
This will activate a file watcher which restarts the app anytime there is a code change in the `src` folder.

## API specification

Every REST API endpoint is documented in an _OpenAPI_ file.
It can be found in the folder `specification/OpenAPI` in the project's
root directory.
To verify that the specification is a valid OpenAPI document run the command `npm run tests:validate-api-schema`.
