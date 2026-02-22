import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›was-used-by-racing-event‹ relationship again', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
