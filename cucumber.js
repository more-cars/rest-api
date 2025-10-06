// Making the variables in the ".env" file available as regular environment variables.
// Only relevant for local test development, because the CI/CD pipeline doesn't use ".env" files.
// (Command will not fail when the file doesn't exist.)
import "dotenv/config.js"

export default {
    paths: ['rest-api-specification/spec/**/*.feature'],
    tags: '@implemented and not @deactivated',
    require: ['tests/behavior/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
        'html:test-reports/behavior/cucumber-report.html',
        'json:test-reports/behavior/cucumber-report.json',
    ],
}
