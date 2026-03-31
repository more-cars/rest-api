import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingEvent.createHasMainVideoRelationship(racingEvent.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createHasMainVideoRelationship(racingEvent.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
