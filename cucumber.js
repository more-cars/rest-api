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
