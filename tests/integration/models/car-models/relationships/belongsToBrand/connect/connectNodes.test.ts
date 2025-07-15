import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
    const carModel = await seedCarModel()
    const brand = await seedBrand()

    const createdRelationship = await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)

    expect(createdRelationship)
        .toHaveProperty('car_model_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('brand_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CarModelRelationship.belongsToBrand)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
