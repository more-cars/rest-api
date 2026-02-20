import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await CarModel.createHasImageRelationship(carModel.id, image.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModel.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
