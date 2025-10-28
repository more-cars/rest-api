import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(LapTime.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createHasPrimeImageRelationship(lapTime.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
