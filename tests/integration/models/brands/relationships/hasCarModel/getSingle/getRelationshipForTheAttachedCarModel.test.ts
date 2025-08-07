import {expect, test} from 'vitest'
import assert from "assert"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {BrandHasCarModelSchema} from "../../../../../../_toolbox/schemas/BrandHasCarModelSchema"

test('Requesting the relationship between BRAND and attached CAR MODEL',
    async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        await Brand.createHasCarModelRelationship(brand.id, carModel.id)

        const relationship = await Brand.getRelationshipForHasCarModel(brand.id, carModel.id)

        if (!relationship) {
            assert.fail(`Relationship creation failed.`)
        }

        validateJson(relationship, BrandHasCarModelSchema)

        expect(relationship.brand_id)
            .toBe(brand.id)

        expect(relationship.car_model_id)
            .toBe(carModel.id)
    })
