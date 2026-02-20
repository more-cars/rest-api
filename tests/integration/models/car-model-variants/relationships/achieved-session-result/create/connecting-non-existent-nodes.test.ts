import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-session-result‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(-42, sessionResult.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
