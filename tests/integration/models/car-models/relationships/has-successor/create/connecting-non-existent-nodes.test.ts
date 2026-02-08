import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-successor‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.createHasSuccessorRelationship(-42, partnerNode.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasSuccessorRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
