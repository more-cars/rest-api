// Making the variables in the ".env" file available as regular environment variables.
// Only relevant for local development, because the CI/CD pipeline doesn't use ".env" files.
// (Command will not fail when the file doesn't exist.)
require('dotenv').config({path: '.env'})

module.exports = {
    default: {
        paths: ['specification/Behavior/**/*.feature'],
        require: ['tests/behavior/**/*.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'html:test-reports/behavior/cucumber-report.html',
            'json:test-reports/behavior/cucumber-report.json',
        ],
    }
}
