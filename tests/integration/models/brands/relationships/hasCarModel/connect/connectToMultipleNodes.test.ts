import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedCarModels} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A BRAND can have multiple ›has-car-model‹ relationships', async () => {
    const brand = await seedBrand()
    const carModelAmount = 3
    const carModels = await seedCarModels(carModelAmount)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await getRelationshipCollection(brand.id, DbRelationship.BrandHasCarModel)

    expect(relationships.length)
        .toBe(carModelAmount)
})
