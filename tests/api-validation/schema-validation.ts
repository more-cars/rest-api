import {Validator} from "@seriousme/openapi-schema-validator"

(async () => {
    await validateSchema('more-cars')
    await validateSchema('flickr')
    await validateSchema('wikimedia')
    await validateSchema('youtube')
})()

async function validateSchema(target: 'more-cars' | 'flickr' | 'wikimedia' | 'youtube') {
    const validator = new Validator()
    const schemaLocation = target === 'more-cars' ? `${__dirname}/../../src/specification/open-api/${target}.openapi.json` : `${__dirname}/../behavior/mock-server/api-specs/${target}.openapi.json`
    const res = await validator.validate(schemaLocation)

    if (res.valid) {
        console.log(`✅ The "${target}" schema conforms to OpenAPI version ${validator.version}.`)
    } else {
        console.log(`❌ Error: The ${target}" schema does not conform to OpenAPI.`)
        console.log(res.errors)
        process.exitCode = 1
    }
}
