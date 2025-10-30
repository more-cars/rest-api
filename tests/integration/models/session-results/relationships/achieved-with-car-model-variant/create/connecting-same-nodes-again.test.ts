import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›achieved-with-car-model-variant‹ relationship again', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, carModelVariant.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, carModelVariant.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
