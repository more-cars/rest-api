import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-session-result‹ relationship again', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
