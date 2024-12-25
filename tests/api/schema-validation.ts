const OpenAPISchemaValidator = require('openapi-schema-validator').default

const targetVersion = 3
const validator = new OpenAPISchemaValidator({version: targetVersion})
const targetSchema = require('../../specification/OpenAPI/more-cars.openapi.json')

if (validator.validate(targetSchema).errors.length > 0) {
    console.log(`⨯ Error: The provided schema does not conform to OpenApi version ${targetVersion}.`)
    process.exitCode = 1
} else {
    console.log(`✓ The provided schema conforms to the OpenApi version ${targetVersion}.`)
}
