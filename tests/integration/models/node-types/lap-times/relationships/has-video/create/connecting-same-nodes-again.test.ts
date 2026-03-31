import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-video‹ relationship again', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const video = await seedNode(DbNodeType.Video)

    await expect(LapTime.createHasVideoRelationship(lapTime.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createHasVideoRelationship(lapTime.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
