import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-successor‹ relationship with valid data', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const partnerNode = await seedNode(ControllerNodeType.CAR_MODEL)

    const createdRelationship = await CarModel.createHasSuccessorRelationship(carModel.properties.id, partnerNode.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(carModel.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(partnerNode.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelHasSuccessor)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
