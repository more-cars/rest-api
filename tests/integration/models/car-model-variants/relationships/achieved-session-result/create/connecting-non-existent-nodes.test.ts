import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-session-result‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(-42, sessionResult.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
