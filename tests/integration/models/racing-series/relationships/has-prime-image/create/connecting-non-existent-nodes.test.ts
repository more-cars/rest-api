import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingSeries.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
