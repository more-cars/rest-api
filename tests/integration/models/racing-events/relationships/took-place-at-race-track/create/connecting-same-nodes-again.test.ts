import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›took-place-at-race-track‹ relationship again', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const raceTrack = await seedNode(DbNodeType.RaceTrack)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.properties.id, raceTrack.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.properties.id, raceTrack.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
