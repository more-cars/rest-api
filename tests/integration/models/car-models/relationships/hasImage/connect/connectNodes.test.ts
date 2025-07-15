import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage.ts"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel.ts"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel.ts"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship.ts"

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
