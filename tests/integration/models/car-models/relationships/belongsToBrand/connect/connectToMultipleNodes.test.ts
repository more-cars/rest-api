import {expect, test} from 'vitest'
import {seedBrands} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrands"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›belongs-to-brand‹ relationships', async () => {
    const carModel = await seedCarModel()
    const brandsAmount = 3
    const brands = await seedBrands(brandsAmount)

    for (const brand of brands) {
        await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)
    }

    const relationships = await getRelationshipCollection(carModel.id, DbRelationship.BrandHasCarModel)

    expect(relationships.length)
        .toBe(1)
})
