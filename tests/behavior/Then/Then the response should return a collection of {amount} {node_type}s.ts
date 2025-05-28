import {Then} from "@cucumber/cucumber"
import assert from "assert"
import Ajv from "ajv"
import {BrandSchema} from "../../_schemas/BrandSchema"
import {CarModelSchema} from "../../_schemas/CarModelSchema"
import {ImageSchema} from "../../_schemas/ImageSchema"

Then('the response should return a collection of {int} {string}s', function (amount: number, nodeType: string) {
    assert.equal(this.latestResponse.data.length, amount)

    let validationSchema = {}

    switch (nodeType.toLowerCase()) {
        case 'brand':
            validationSchema = BrandSchema
            break
        case 'car model':
            validationSchema = CarModelSchema
            break
        case 'image':
            validationSchema = ImageSchema
            break
        default:
            assert.fail(`Node type "${nodeType}" is invalid`)
    }

    const validate = new Ajv().compile(validationSchema)
    this.latestResponse.data.forEach((item: any) => {
        const valid = validate(item)
        if (!valid) {
            console.log(validate.errors)
            console.log(item)
        }
        assert.ok(valid)
    })
})
