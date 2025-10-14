import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

test('Creating a ›has-successor‹ relationship with valid data', async () => {
    const carModel = await seedCarModel()
    const partnerNode = await seedCarModel()

    const createdRelationship = await CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id)

    expect(createdRelationship)
        .toHaveProperty('car_model_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('partner_id', partnerNode.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CarModelRelationship.hasSuccessor)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
