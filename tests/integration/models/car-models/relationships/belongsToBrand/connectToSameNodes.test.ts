import {seedBrand} from "../../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {
    CarModelBelongsToBrandRelationship
} from "../../../../../../src/types/car-models/CarModelBelongsToBrandRelationship"
import {CarModel} from "../../../../../../src/models/CarModel"

describe('Car Model', () => {
    test('The relationship ID should not change when creating the same relationship again', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const relationshipBefore: CarModelBelongsToBrandRelationship =
            await CarModel.createBelongsToBrandRelationship(carModel, brand)
        const relationshipAfter: CarModelBelongsToBrandRelationship =
            await CarModel.createBelongsToBrandRelationship(carModel, brand)

        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    })
})
