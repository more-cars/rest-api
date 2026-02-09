# More Cars - REST API

## Quickstart (local dev environment)

This quickstart manual shows the fastest way to get the app running, with the least amount of tools.
For an alternative Kubernetes setup check out the [Minikube](#minikube-local-kubernetes-cluster) section.

### Requirements

* Node.js (version >= 24) & npm
* Docker
* Any OS should work (but tested only on Linux)

### Installation

* Clone or download the repository from https://github.com/more-cars/rest-api.git
* Run `npm run local:db:start` to start the database in a local Docker container
    * when opening http://localhost:7474 the "Neo4j browser" should be shown
    * optional: log in -> no credentials needed -> just click "Connect"
* Run `npm install` to install all required dependencies and tools
* Run `npm run local:app:start` to start the app locally
    * it should be available now at http://localhost:3000
    * an `.env` should have been created automatically in the project's root folder
        * it should contain the location of the database -> default: `DB_HOST=localhost`
        * it should contain the password for the database -> default: `DB_PASSWORD=123456789`
        * optional: change those values when you want to use a different database (e.g. from the Minikube cluster)
* Optional: Using "pretty" hostnames instead of `localhost`:
    * run `npm run local:hostnames:add`
    * this makes the REST API available at http://api.more-cars.internal:3000/
    * this makes the API specification available at http://swagger.more-cars.internal:3000/
    * this makes the database available at http://db.more-cars.internal:7474/

## Minikube (local Kubernetes cluster)

Minikube is a quick and simple option to create a local Kubernetes cluster.
See documentation for more information: https://minikube.sigs.k8s.io/docs/.
The Minikube cluster uses exactly the same Kubernetes configuration files as the "real" Kubernetes cluster in GKE
(see `deployment/app` and `deployment/overlays` folder).
This allows to test situations that might happen in the production environment,
but cannot be recreated in a local dev environment.

### Start cluster

* Run `npm run minikube:install` to install the latest version of Minikube
    * requires sudo privileges
    * the script can be re-run multiple times
        * when a newer version is available it will override the installed one
        * when there is no newer version then the installed one remains untouched
* Run `npm run minikube:start` to start a local minikube cluster
    * this should automatically open the Kubernetes dashboard in the browser (might take a few minutes)
    * memory and CPU settings can be adjusted in the file `deployment/minikube-cluster-start.sh`
* Run `npm run minikube:stop` to stop the Minikube cluster
    * aborting the `minikube:start` terminal (`ctrl` + `c` or `command` + `c`) will NOT stop the cluster
* Run `npm run minikube:delete` to destroy the Minikube cluster
    * changes to the memory or CPU settings require a hard delete (a restart is not sufficient)
    * a new cluster can be created by running `npm run minikube:start` again

### Start application

* Make sure the Minikube cluster is running (see [Minikube](#start-cluster) section)
* Run `npm run app:deploy`
    * a wizard will start
        * select `minikube`, `dev`, `rest-api` and `latest`
    * this will deploy the app, the API specification and the database in Minikube
    * it will start all needed services
    * it will create the necessary host entries in the local `/etc/hosts` file
        * needs to be confirmed via password
            * abort if you want to do it manually or you when you use a different hosts file
    * the app should now be available at https://api.dev.more-cars.internal
        * accept the browser's security risk warning (the gateways in the local cluster use dummy certificates)
    * the API specificaiton should now be available at https://swagger.dev.more-cars.internal
    * the database should now be available at https://db.dev.more-cars.internal
* Run `npm run app:undeploy` to completely remove the app from the Minikube cluster
    * a wizard will ask for the concrete cluster and environment that should be deleted
    * run `npm run app:deploy` to create a fresh version of the app again

## Docker Images

All docker images are managed automatically in the pipeline (see files in folder `.github/workflows`).
There should be no need to create, tag or push them locally.

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

## Tests

### API Validation

All REST API endpoints are documented in an _OpenAPI_ file.
It can be found in the folder `specification/OpenAPI` in the project's root directory.
To verify that the specification is a valid OpenAPI document run `npm run tests:validate-api-schema`.

### Unit / Integration tests

* run `npm run tests:unit` to execute all unit tests
    * test report is created in folder `test-reports/unit`
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
