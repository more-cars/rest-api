import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACE TRACK can have multiple ›hosted-racing-event‹ relationships', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(DbNodeType.RacingEvent, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.properties.id,
        RelationshipType.RaceTrackHostedRacingEvent,
        DbNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
