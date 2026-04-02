import {Validator} from "@seriousme/openapi-schema-validator"

(async () => {
    await validateMoreCarsSchema()
    await validateYouTubeSchema()
})()

async function validateMoreCarsSchema() {
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

async function validateYouTubeSchema() {
    const validator = new Validator()
    const res = await validator.validate(__dirname + '/../behavior/mock-server/api-specs/youtube.openapi.json')

    if (res.valid) {
        console.log(`✓ The provided schema conforms to OpenAPI version ${validator.version}.`)
    } else {
        console.log(`⨯ Error: The provided schema does not conform to OpenAPI.`)
        console.log(res.errors)
        process.exitCode = 1
    }
}
