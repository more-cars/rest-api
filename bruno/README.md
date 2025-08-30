# Bruno Collection / Smoke Tests

This folder contains a collection of prepared REST API requests.
They cover every feature that the **More Cars API** offers.
There are requests for creating, fetching and deleting nodes of each type (car model, brand, image, etc).
And there are requests for creating, fetching and deleting all possible types of relationships.
Most requests come in pairs of two or more, to deal with the happy path(s) as well as the unhappy path(s).
There are for example two requests for creating a car model with valid data
and two for trying to create it with invalid data.

The intention of this collection is to help experimenting with the API,
learning the API or doing ad-hoc manual tests.
There are automated tests attached to each request,
but their sole purpose it to act as **smoke tests.**
They are not meant to be used as a full-blown test suite.
They are not designed to test every feature in detail.

To be able to execute these requests **Bruno** needs to be installed,
the **application** needs to be running and the **database** as well.
The CLI version of Bruno is already included and will be available after performing `npm install`.
The GUI version of Bruno needs to be installed manually.
See here: https://docs.usebruno.com/get-started/bruno-basics/download.

The `run npm tests:smoke:gui` command opens Bruno in graphics mode.
It allows to run specific requests, experiment with them or create new ones.
The responses can be analyzed and a wizard allows to add assertions very easily.
The target environment can be switched on the fly.
A set of standard environments is preconfigured and can be found in the `bruno/environments` folder.

The Bruno requests are built to be **self-sufficient** and independent.
They will create any required data on their own - be it a node, a relationship or both.
E.g. for the request `Get Brand by ID` to work there actually needs to exist
a brand in the database and Bruno needs to know the ID of it.
There are `pre-request` sections in the scripts which will take care of such things.
The referenced helper functions can be found in the `bruno/collection.bru` file.

On the command line the test execution can be triggered via `npm run tests:smoke:cli`.
The script will prompt for the required information and then run the tests.
To avoid the prompting (e.g. when running in the pipeline)
the information can also be prepared in form of environment variables.
See `tests/smoke/run-tests.sh` to find out which those are.
