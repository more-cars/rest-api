import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-successor‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const partnerNode = await seedNode(ControllerNodeType.CAR_MODEL)

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
