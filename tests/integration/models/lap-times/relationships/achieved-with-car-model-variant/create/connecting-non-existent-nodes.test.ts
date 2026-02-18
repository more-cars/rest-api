import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-with-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(-42, carModelVariant.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
