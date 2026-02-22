import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›used-the-track-layout‹ relationship again', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.properties.id, trackLayout.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
