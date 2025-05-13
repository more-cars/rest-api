import {seedBrand} from "../../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {BrandHasCarModelRelationship} from "../../../../../../src/types/brands/BrandHasCarModelRelationship"
import {Brand} from "../../../../../../src/models/Brand"

describe('Brand', () => {
    test('The relationship ID should not change when creating the same relationship again', async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const relationshipBefore: BrandHasCarModelRelationship =
            await Brand.createHasCarModelRelationship(brand, carModel)
        const relationshipAfter: BrandHasCarModelRelationship =
            await Brand.createHasCarModelRelationship(brand, carModel)

        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    })
})
