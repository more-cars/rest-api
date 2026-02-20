import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING EVENT cannot have multiple ›took-place-at-race-track‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const raceTracksAmount = 3
    const raceTracks = await seedNodes(ControllerNodeType.RACE_TRACK, raceTracksAmount)

    for (const raceTrack of raceTracks) {
        await RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventTookPlaceAtRaceTrack,
        DbNodeType.RaceTrack,
    )

    expect(relationships.length)
        .toBe(1)
})
