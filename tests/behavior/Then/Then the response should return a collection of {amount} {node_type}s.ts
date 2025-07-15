import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BrandSchema} from "../../_toolbox/schemas/BrandSchema"
import {CarModelSchema} from "../../_toolbox/schemas/CarModelSchema"
import {ImageSchema} from "../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../_toolbox/validateJson"

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

    this.latestResponse.data.forEach((item: any) => {
        assert.ok(validateJson(item, validationSchema))
    })
})
