import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-successor-of‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partner = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.createIsSuccessorOfRelationship(-42, partner.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createIsSuccessorOfRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
