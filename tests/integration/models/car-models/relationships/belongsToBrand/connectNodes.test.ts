import {seedBrand} from "../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {CarModelRelationship} from "../../../../../../src/types/car-models/CarModelRelationship"

describe('Car Model', () => {
    test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const createdRelationship = await CarModel.createBelongsToBrandRelationship(carModel, brand)

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
