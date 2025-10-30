import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›achieved-session-result‹ relationship again', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.id, sessionResult.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.id, sessionResult.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
