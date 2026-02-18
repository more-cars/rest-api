import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-successor‹ relationship with valid data', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    const createdRelationship = await CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModel.id)
    expect(createdRelationship.destination.id)
        .toEqual(partnerNode.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelHasSuccessor)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
