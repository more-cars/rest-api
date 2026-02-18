import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(LapTime.createHasPrimeImageRelationship(lapTime.id, image.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createHasPrimeImageRelationship(lapTime.id, image.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
