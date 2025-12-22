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
* run `npm run app:deploy` to deploy and start the application
    * this deploys the app, the database and the API specification (SwaggerUI)
    * a wizard will ask for the target environment (dev, testing or prod)
* run `npm run minikube:open-tunnel` to allow the services to be accessible from outside the cluster
    * requires sudo privileges
* go to the "services" section in the kubernetes dashboard
    * search for `api-service`
    * the column `external endpoints` contains the URL to access the app
    * follow that link to make sure the app is running properly
* run `npm run app:undeploy` to remove the whole application from the cluster
    * run `npm run app:deploy` to recreate the application from scratch again (empty database, fresh pods, etc.)

## Docker Images

* run `npm run docker:build-image` to create a docker image of the application
    * it can be used for local deployments or as "real" release candidates for production
* run `npm run docker:tag-image:dev` to tag the image as a development image
* run `npm run docker:tag-image` to tag the image as a production image

## Databases

All databases (except in local environment) require a password.
The deployment scripts expect it as "Kubernetes Secret" with the name `db-credentials`,
containing the key-value pair `password=the_password`.
In Minikube this secret is automatically added when deploying the app for the first time.
For the GKE environments this needs to be done manually.

Changing the (initial) password requires two steps.
First, override the secret in Kubernetes:

```
kubectl delete secret db-credentials \
  --ignore-not-found \
  --namespace=testing && \
kubectl create secret generic db-credentials \
  --from-literal=password='newpassword' \
  --namespace=testing
```

Then, change the password in the database.
Connect to the respective Neo4j pod (`docker exec -it ...`).
Run `cypher-shell -u neo4j` and enter the current password.
Type `ALTER USER neo4j SET PASSWORD 'newpassword';` with the new password.
Enter.
Done.

## SSL Certificate

At the moment, an SSL certificate is not mandatory to run the application -
be it locally, in Minikube or in the production system.
Should there be a certificate then the app will start an HTTP and an HTTPS server in parallel.
When there is no certificate then only the HTTP server is started.

In a local environment the application expects the certificate files in the folder `certificates`,
named `tls.crt` and `tls.key`.

In Minikube a dummy certificate is automatically added when deploying the app for the first time.
There should be no need to replace it, because it is not possible to create a valid one for local environments anyway.

For GKE the certificate needs to be added manually:

```
./deployment/lib/store-certificate-as-k8s-secret.sh api <NAMESPACE> <CERTIFICATE_PATH>
```

This will create a "Kubernetes Secret" with the name `certificate-api` in the given namespace (e.g. `testing`).

To replace or renew the certificate the following commands can be used:

```
kubectl delete secret certificate-api \
  --ignore-not-found \
  --namespace=<NAMESPACE> && \
kubectl create secret tls certificate-api \
  --cert=<CERTIFICATE_PATH>/tls.crt \
  --key=<CERTIFICATE_PATH>/tls.key \
  --namespace=<NAMESPACE>
```

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
    * a wizard will ask for the required parameters
    * by default the test report is created in folder `test-reports/integration`
    * by default the code coverage report is created in folder `test-reports/integration/code-coverage` (if activated)
* run `npm run tests:developer` to execute all unit and all integration tests
    * test report is created in folder `test-reports/developer`
* run `npm run tests:developer:coverage` to run both test suites and to create a combined code coverage report
    * test report is created in folder `test-reports/developer`
    * coverage report is created in folder `test-reports/developer/code-coverage`

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

### Smoke Tests

The _Bruno_ collection is reused to serve as smoke tests.
The collection covers every API feature and performs a handful of simple tests for each of them.
The tests are extremely fast and can be run against every environment.
The only issue to be aware of is that they create random data.
So, running them against the production environment is possible, but the test data has to be deleted manually afterward.

Running `npm run tests:smoke:gui` will open the graphical version of Bruno.
With `npm run tests:smoke:cli` the command line version is triggered.
Both work on exactly the same request collection and with the same tests.

The README file in the `bruno` folder provides more information regarding the differences and how to configure the test
runs.

### Performance Tests

The performance tests check the response times of each endpoint under a **low** load.
The goal is **not** to find the limits, but to establish a baseline.
When a code change makes the application significantly slower, then this should be detected by the tests.

The test scenarios can be found in the folder `tests/performance/scenarios`.
The start script is located one level above: `tests/performance/run-tests.sh`.
It can be executed directly on the command line (`./run-tests.sh`) or via npm script (`npm run tests:performance`).

The actual test tool is `Grafana k6`.
It runs the scenarios and creates a test report in the end.
Environment variables are used to tell k6 which scenario to run, against which environment and so on.
These are the available options (incl. example values):

```
TEST_RUNNER=local
TARGET_CLUSTER=local
TARGET_ENVIRONMENT=local
API_URL=http://localhost:3000
SCENARIO=brands/create.ts
REPORT_PATH=reports
REPORT_FILENAME=report.html
K6_WEB_DASHBOARD=true
K6_WEB_DASHBOARD_EXPORT=reports/report.html
K6_WEB_DASHBOARD_OPEN=false
K6_WEB_DASHBOARD_PERIOD=3s
```

When any of those variables is missing then the script will switch into interactive mode,
where it prompts the user to provide the missing information.
Selecting a `local` runner requires `k6` to be installed on the current machine.
Please refer to the official documentation: https://grafana.com/docs/k6/latest/set-up/install-k6/.
When selecting `minikube` or `gke` as target cluster then a local k6 installation is not required.
All tests will be run via a k6 docker container in the respective cluster.

By default, the command line will only show a summary report at the end of a test run.
When the `K6_WEB_DASHBOARD` variables are configured an HTML report is generated additionally.
The official documentation at https://grafana.com/docs/k6/latest/results-output/web-dashboard/ provides more
information.

## Development mode

Running the app with `npm start` will start it with a production-like configuration.
When developing and debugging the app it is recommended to use the command `npm run local:app:start` instead.
This will activate a file watcher which listens to all modules that are used by the app.
Whenever one of them is updated the app will automatically restart to reflect those changes.

In both cases, the application is available at `localhost:3000` and `127.0.0.1:3000`.
For better readability and easier handling within the different tools the app should be given a proper domain name.
This can be achieved by manually adding the necessary information to the `/etc/hosts/` file
or by running `npm run local:hostnames:add` (requires sudo privileges).
This will make the app available under the domain name `api.more-cars.internal`.
It also adds a hostname for the database: `db.more-cars.internal`.

## Deployments

The command `npm run app:deploy` allows to deploy the whole application to any environment in any cluster.
A wizard will ask for all required information.
Alternatively, the configuration options can also be provided via environment variables.
The wizard will then be skipped and the deployment process is automatically started.

```
TARGET_CLUSTER=minikube
TARGET_ENVIRONMENT=testing
PACKAGE_NAME=rest-api
PACKAGE_VERSION=0.15.0
```

All deployments (apps, database, services, jobs, etc.) run in a `kubernetes` cluster.
The respective templates can be found in the folders `deployment/app` and `deployment/jobs`.
By design, those kubernetes templates are completely static.
This leads to quite some copy'n'paste, because each environment needs their own set of templates.
To avoid this situation and to keep the templates somewhat maintainable the kubernetes plugin `kustomize` is used.
It allows each environment to inherit from the kubernetes configs and only override those parts that are different,
e.g. the namespace.
The respective scripts can be found in the `deployment/overlay` folder.

When this is the first deployment to the environment, all pods and services will be created.
When the deployment already exists it will be updated.
When there is nothing to update (because no changes) then nothing will happen to the existing deployment.

The cluster itself will **not** be created on the fly.
If it doesn't exist then the deployment will fail.

The local `minikube` cluster and the remote `GKE` cluster use exactly the same templates.
This reduces the maintenance effort significantly.
The only difference is the authorization.

For the scripts to work locally the tools `gcloud` and `kubectl` need to be installed.
See https://cloud.google.com/sdk/docs/install and https://kubernetes.io/docs/tasks/tools/.
