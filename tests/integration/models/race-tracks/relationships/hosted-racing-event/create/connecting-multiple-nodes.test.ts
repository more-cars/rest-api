import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACE TRACK can have multiple ›hosted-racing-event‹ relationships', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(NodeTypeEnum.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RaceTrack.createHostedRacingEventRelationship(raceTrack.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(raceTrack.id, DbRelationship.RaceTrackHostedRacingEvent)

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
