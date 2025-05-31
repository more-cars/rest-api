import {seedBrand} from "../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../src/models/CarModel"

describe('Car Model', () => {
    test('The relationship ID should not change when creating the same relationship again', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const relationshipBefore =
            await CarModel.createBelongsToBrandRelationship(carModel, brand)
        expect(relationshipBefore)
            .not.toBe(false)

        const relationshipAfter =
            await CarModel.createBelongsToBrandRelationship(carModel, brand)
        expect(relationshipAfter)
            .not.toBe(false)

        if (relationshipAfter && relationshipBefore) {
            expect(relationshipAfter.relationship_id)
                .toEqual(relationshipBefore.relationship_id)
        }
    })
})
