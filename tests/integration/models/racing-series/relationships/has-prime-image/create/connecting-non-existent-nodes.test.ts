import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingSeries.createHasPrimeImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
