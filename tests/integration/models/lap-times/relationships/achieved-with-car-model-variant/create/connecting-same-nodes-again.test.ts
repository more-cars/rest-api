import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-with-car-model-variant‹ relationship again', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
