import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('The relationship ID should not change when creating the same relationship again', async () => {
    const brand = await seedBrand()
    const carModel = await seedCarModel()

    const relationshipBefore =
        await Brand.createHasCarModelRelationship(brand, carModel)
    expect(relationshipBefore)
        .not.toBe(false)

    const relationshipAfter =
        await Brand.createHasCarModelRelationship(brand, carModel)
    expect(relationshipAfter)
        .not.toBe(false)

    if (relationshipAfter && relationshipBefore) {
        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    }
})
