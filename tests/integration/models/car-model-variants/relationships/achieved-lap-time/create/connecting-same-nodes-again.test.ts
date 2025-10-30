import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›achieved-lap-time‹ relationship again', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    await expect(CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.id, lapTime.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.id, lapTime.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
