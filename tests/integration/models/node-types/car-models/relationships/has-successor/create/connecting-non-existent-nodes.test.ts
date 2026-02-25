import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-successor‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const partnerNode = await seedNode(DbNodeType.CarModel)

    await expect(CarModel.createHasSuccessorRelationship(-42, partnerNode.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasSuccessorRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasSuccessorRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
