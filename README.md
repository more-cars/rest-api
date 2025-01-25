# More Cars - REST API

## Quickstart

* Install Node.js and npm
* Clone repository: https://github.com/more-cars/rest-api.git
* Copy the `.env.template` file and save as `.env`
* Configure the location of a running database in the `.env` file
* run `npm install`
* run `npm run local:app:start` to start the app locally
    * it should be available at http://localhost:3000
    * see [Minikube](#minikube-local-dev-cluster) section on how to run the app in a local kubernetes cluster

## Minikube (Local Dev Cluster)

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

* make sure the minikube cluster is running (see [Minikube](#minikube-local-dev-cluster) section)
* run `npm run docker:build-image` to crate a docker image of the application
    * the image will be built with the code that is currently on the disk
* run `npm run docker:tag-image:dev` to mark this image as a (temporary) dev version
* run `npm run minikube:import-dev-image` to push the image into the minikube cluster
* run `npm run minikube:deploy:dev` to deploy and start the application
    * this deploys the app, the database and the API specification (SwaggerUI)
* run `npm run minikube:open-tunnel` to allow the services to be accessible from outside the cluster
    * requires sudo privileges
* go to the "services" section in the kubernetes dashboard
    * search for `app-dev-service`
    * the column `external endpoints` contains the URL to access the app
    * check out the URL to make sure the app is running properly
* run `npm run minikube:undeploy:dev` to remove the whole application from the cluster
    * run `npm run minikube:deploy:dev` to start the application from scratch again (empty database, fresh pods, etc.)

## Build application

* run `npm run docker:build-image` to create a docker image for the application
    * the resulting image can be used for local deployments or for a "real" release candidate for production

## Run tests

### Unit / Integration tests

* run `npm run tests:unit` to execute all unit tests
    * test reports will be created in folder `test-reports/unit`
* run `npm run tests:integration` to execute all integration tests
    * test reports will be created in folder `test-reports/integration`
* run `npm run tests:unit+integration` to execute all unit and all integration tests
    * test reports will be created in folder `test-reports/combined`
* run `npm run tests:unit+integration:coverage` to create a combined code coverage report for both test suites
    * test reports will be created in folder `test-reports/combined`
    * the coverage report will be saved in folder `test-reports/code_coverage`

### Behavior tests

* run `npm run tests:cucumber` to execute all behavior tests
* this requires
    * a running app
    * a running database
* the report will be saved in folder `test-reports/behavior`

## Development mode

When actively developing or debugging the app it is recommended to use the command `npm run dev:app:start`
instead of the `local:app:start` script.
This will activate a file watcher which restarts the app anytime there is a code change in the `src` folder.

## API specification

Every REST API endpoint is documented in an _OpenAPI_ file.
It can be found in the folder `specification/OpenAPI` in the project's
root directory.
To verify that the specification is a valid OpenAPI document run the command `npm run tests:validate-api-schema`.

## Deployment To Production Environment

### Deploying From Local Machine

Deploying the application to a "real" kubernetes cluster is very similar
to the deployment with Minikube (see [minikube section](#minikube-local-dev-cluster)).
The Kubernetes configs are indeed exactly the same, see folder `deployment/prod`.
They are used for both clusters identically.
The only difference lies in getting access to the cluster.

#### Production-like Environment In Minikube

With `npm run minikube:deploy:prod` the application is deployed to the local Minikube cluster.
This is the same command that was used in the [minikube section](#minikube-local-dev-cluster),
only this time it creates a `prod` environment instead of a `dev` environment.
The main difference being the source of the docker image (local vs DockerHub repository).

The start script (`npm run minikube:start`) will automatically create a cluster if it doesn't exist yet.

#### Real Production Environment In Google Cloud

The command `npm run gke:deploy:prod` will log in to the Google Cloud,
select the correct cluster and then roll out all the Kubernetes configuration files.

When this is the first time, all pods and services will be created.
When the deployment already exists it will be updated.
When there is nothing to update (because no changes) then nothing will happen to the existing deployment.

The cluster will **not** be created on the fly.
If it doesn't exist then the deployment will fail.
It needs to be created manually.
There exists no script, yet.

The login step will open a browser window and requires a manual login to the Google Cloud.

For the script to work the tools `gcloud` and `kubectl` need to be installed.
See https://cloud.google.com/sdk/docs/install and https://kubernetes.io/docs/tasks/tools/.

### Deploying Via GitHub Actions Pipeline

...