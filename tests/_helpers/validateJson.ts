import Ajv from "ajv"
import assert from "assert"

export function validateJson(data: any, validationSchema: any) {
    const validate = new Ajv().compile(validationSchema)
    const valid = validate(data)
    if (!valid) {
        console.log(validate.errors)
        console.log(data)
    }
    assert.ok(valid)
}
