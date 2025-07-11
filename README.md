# More Cars - REST API

## Quickstart

* install Node.js, npm and Docker
    * see [Minikube](#minikube-local-dev-cluster) section for a Kubernetes-based environment
* clone the repository: https://github.com/more-cars/rest-api.git
* run `npm run local:db:start` to start Neo4j as a local Docker container
    * it should be available at http://localhost:7474 (no credentials needed)
* copy the `.env.template` file and save it as `.env`
    * specify the location of the database: `DB_HOST=localhost`
    * password is not needed
* run `npm install` to install all required dependencies and tools
* run `npm run local:app:start` to start the app locally
    * it should be available at http://localhost:3000

## Minikube (Local Dev Cluster)

### Start cluster

* run `npm run minikube:install` to install the latest version of minikube
    * requires sudo privileges
    * can be run multiple times
        * if a newer version is available it will be installed
* run `npm run minikube:start` to start a local minikube cluster
    * this should open the kubernetes dashboard in the browser (wait ~30-60 seconds)
* run `npm run minikube:stop` to stop the minikube cluster
    * can also be achieved by aborting the `minikube:start` terminal (`ctrl` + `c` or `command` + `c`)
* run `npm run minikube:delete` to destroy the minikube cluster
    * changes to the memory or cpu settings require a "delete" (a restart is not sufficient)
    * a new cluster can be created with `npm run minikube:start`
        * the IP addresses of all services will change (starting and stopping preserves the IP addresses)

### Start application

* make sure the minikube cluster is running (see [Minikube](#minikube-local-dev-cluster) section)
* run `npm run docker:build-image` to crate a docker image of the application
    * the image will be built based on the code that is currently on the disk (not what is checked in)
* run `npm run docker:tag-image:dev` to mark this image as a (temporary) dev version
* run `npm run minikube:import-dev-image` to push the image into the minikube cluster
* run `npm run minikube:deploy:dev` to deploy and start the application
    * this deploys the app, the database and the API specification (SwaggerUI)
* run `npm run minikube:open-tunnel` to allow the services to be accessible from outside the cluster
    * requires sudo privileges
* go to the "services" section in the kubernetes dashboard
    * search for `api-service`
    * the column `external endpoints` contains the URL to access the app
    * follow that link to make sure the app is running properly
* run `npm run minikube:undeploy:dev` to remove the whole application from the cluster
    * run `npm run minikube:deploy:dev` to start the application from scratch again (empty database, fresh pods, etc.)

## Docker Images

* run `npm run docker:build-image` to create a docker image of the application
    * it can be used for local deployments or as "real" release candidates for production
* run `npm run docker:tag-image:dev` to tag the image as a development image
* run `npm run docker:tag-image` to tag the image as a production image

## Tests

### API Validation

All REST API endpoints are documented in an _OpenAPI_ file.
It can be found in the folder `specification/OpenAPI` in the project's root directory.
To verify that the specification is a valid OpenAPI document run `npm run tests:validate-api-schema`.

### Unit / Integration tests

* run `npm run tests:unit` to execute all unit tests
    * test report is created in folder `test-reports/unit`
* run `npm run tests:unit:coverage` to execute all unit tests and generate a code coverage report
    * test report is created in folder `test-reports/unit`
    * coverage report is created in folder `test-reports/unit/code-coverage`
* run `npm run tests:integration` to execute all integration tests
    * test report is created in folder `test-reports/integration`
* run `npm run tests:integration:coverage` to execute all integration tests and generate a code coverage report
    * test report is created in folder `test-reports/integration`
    * coverage report is created in folder `test-reports/integration/code-coverage`
* run `npm run tests:unit+integration` to execute all unit and all integration tests
    * test report is created in folder `test-reports/unit+integration`
* run `npm run tests:unit+integration:coverage` to run both test suites and to create a combined code coverage report
    * test report is created in folder `test-reports/unit+integration`
    * coverage report is created in folder `test-reports/unit+integration/code-coverage`

### Behavior tests

The application's expected behavior is documented via `Gherkin` scenarios.
They can be found in the directory `specification/Behavior`.
Those scenarios are automated in form of `Cucumber` tests.
Their implementation can be found in the directory `tests/behavior`.

With `npm run tests:behavior` the whole suite of Cucumber tests can be executed.
They run sequentially and produce test reports that can be found in the directory `test-reports/behavior`.

The environment variable `API_URL` specifies where the tests can find the application.
This needs to be a running instance of the API.
It can be a local instance, a container in minikube or a cloud deployment - as long as the tests have access to it.

### Load Tests

The load tests are written in TypeScript and will be executed with `Grafana k6`.
The test scripts can be found in the folder `tests/performance`.
By default, the command line will show a summary report at the end of a test run.
For more detailed information an HTML report can be generated (see steps below).

The k6 documentation can be found here: https://grafana.com/docs/k6/latest/.

#### Via Local Installation

When running k6 locally, it needs to be installed manually.
Please refer to the official documentation: https://grafana.com/docs/k6/latest/set-up/install-k6/.

When installation was successful, open a terminal.
Go to the folder `tests/performance`.
Run the command `./k6 run get-api-specification.ts`.
This will perform a 5-minute-long test and will show a short summary in the end.
A more detailed report can be generated by configuring k6 before starting it.
Run the following commands to receive an HTML report in the end.

```
export K6_WEB_DASHBOARD=true \

export K6_WEB_DASHBOARD_OPEN=false \

export K6_WEB_DASHBOARD_EXPORT=../../test-reports/performance/html-report.html \

./k6 run get-api-specification.ts
```

#### Via Minikube

...

## Development mode

Running the app with `npm start` will start it with a production-like configuration.
When developing and debugging the app it is recommended to use the command `npm run local:app:start` instead.
This will activate a file watcher which listens to all modules that are used by the app.
Whenever one of them is changed the app will automatically be restarted with those changes.

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