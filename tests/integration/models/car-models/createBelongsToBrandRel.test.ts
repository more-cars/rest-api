import {seedBrand} from "../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../dbSeeding/seedCarModel"
import {CarModel} from "../../../../src/models/CarModel"
import {CarModelRelationship} from "../../../../src/types/car-models/CarModelRelationship"
import {CarModelBelongsToBrandRelationship} from "../../../../src/types/car-models/CarModelBelongsToBrandRelationship"

describe('Car Model', () => {
    test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const createdRelationship: CarModelBelongsToBrandRelationship = await CarModel.createBelongsToBrandRelationship(carModel, brand)

        expect(createdRelationship)
            .toHaveProperty('car_model_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('brand_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelRelationship.belongsToBrand)
    })

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
