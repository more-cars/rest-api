import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A RACE TRACK can have multiple ›hosted-racing-event‹ relationships', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(ControllerNodeType.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RaceTrack.createHostedRacingEventRelationship(raceTrack.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.id,
        RelationshipType.RaceTrackHostedRacingEvent,
        Neo4jNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
