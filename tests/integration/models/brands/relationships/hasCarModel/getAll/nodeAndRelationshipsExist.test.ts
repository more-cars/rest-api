import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedCarModels} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"

test('BRAND exists and has ›has-car-model‹ relationships', async () => {
    const brand = await seedBrand()
    const carModels = await seedCarModels(3)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await Brand.getAllHasCarModelRelationships(brand.id)

    expect(relationships.length)
        .toBe(3)
})
