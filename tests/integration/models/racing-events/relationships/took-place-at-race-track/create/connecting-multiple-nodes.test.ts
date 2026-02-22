import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT cannot have multiple ›took-place-at-race-track‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const raceTracksAmount = 3
    const raceTracks = await seedNodes(DbNodeType.RaceTrack, raceTracksAmount)

    for (const raceTrack of raceTracks) {
        await RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.properties.id, raceTrack.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.properties.id,
        RelationshipType.RacingEventTookPlaceAtRaceTrack,
        DbNodeType.RaceTrack,
    )

    expect(relationships.length)
        .toBe(1)
})
