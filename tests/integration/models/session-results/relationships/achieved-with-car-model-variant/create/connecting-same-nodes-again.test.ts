import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-with-car-model-variant‹ relationship again', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
