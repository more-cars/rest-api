import {seedBrand} from "../../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {
    CarModelBelongsToBrandRelationship
} from "../../../../../../src/types/car-models/CarModelBelongsToBrandRelationship"
import {CarModel} from "../../../../../../src/models/CarModel"
import {CarModelRelationship} from "../../../../../../src/types/car-models/CarModelRelationship"

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
})
