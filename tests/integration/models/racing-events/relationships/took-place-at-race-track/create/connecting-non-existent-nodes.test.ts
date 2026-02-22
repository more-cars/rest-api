import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›took-place-at-race-track‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const raceTrack = await seedNode(DbNodeType.RaceTrack)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(-42, raceTrack.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
