import Ajv from "ajv"

export function validateJson(data: any, validationSchema: any): boolean {
    const validate = new Ajv().compile(validationSchema)
    const valid = validate(data)
    if (!valid) {
        console.log(validate.errors)
        console.log(data)
    }

    return valid
}
