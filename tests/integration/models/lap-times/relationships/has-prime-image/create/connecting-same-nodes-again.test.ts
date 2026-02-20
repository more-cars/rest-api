import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(LapTime.createHasPrimeImageRelationship(lapTime.id, image.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createHasPrimeImageRelationship(lapTime.id, image.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
