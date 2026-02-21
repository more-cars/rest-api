import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-lap-time‹ relationship again', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
    const lapTime = await seedNode(ControllerNodeType.LapTime)

    await expect(CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.properties.id, lapTime.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.properties.id, lapTime.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
