import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

test('Creating a "Car Model has Image" relationship', async () => {
    const carModel = await seedCarModel()
    const image = await seedImage()

    const createdRelationship = await CarModel.createHasImageRelationship(carModel.id, image.id)

    expect(createdRelationship)
        .toHaveProperty('car_model_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('image_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CarModelRelationship.hasImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
