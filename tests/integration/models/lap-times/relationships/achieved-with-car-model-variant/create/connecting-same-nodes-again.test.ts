import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›achieved-with-car-model-variant‹ relationship again', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.id, carModelVariant.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.id, carModelVariant.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
