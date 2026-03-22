import {Validator} from "@seriousme/openapi-schema-validator"

validateSchema().then(_ => true)

async function validateSchema() {
    const validator = new Validator()
    const res = await validator.validate(__dirname + '/../../src/specification/open-api/more-cars.openapi.json')

    if (res.valid) {
        console.log(`✓ The provided schema conforms to OpenAPI version ${validator.version}.`)
    } else {
        console.log(`⨯ Error: The provided schema does not conform to OpenAPI.`)
        console.log(res.errors)
        process.exitCode = 1
    }
}
