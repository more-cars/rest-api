import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingSeries.createHasMainVideoRelationship(racingSeries.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSeries.createHasMainVideoRelationship(racingSeries.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
