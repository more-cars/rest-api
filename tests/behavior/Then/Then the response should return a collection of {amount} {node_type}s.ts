import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {CompanySchema} from "../../_toolbox/schemas/CompanySchema"
import {BrandSchema} from "../../_toolbox/schemas/BrandSchema"
import {CarModelSchema} from "../../_toolbox/schemas/CarModelSchema"
import {ImageSchema} from "../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../_toolbox/validateJson"

Then('the response should return a collection of {int} {string}s',
    (amount: number, nodeType: string) => {
        assert.equal(world.recallResponse().data.length, amount)

        let validationSchema = {}

        switch (nodeType.toLowerCase()) {
            case 'company':
                validationSchema = CompanySchema
                break
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
                assert.fail(`Node type "${nodeType}" is invalid or unknown`)
        }

        world.recallResponse().data.forEach((item: any) => {
            assert.ok(validateJson(item, validationSchema))
        })
    })
