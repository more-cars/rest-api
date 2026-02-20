import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-with-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(-42, carModelVariant.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
