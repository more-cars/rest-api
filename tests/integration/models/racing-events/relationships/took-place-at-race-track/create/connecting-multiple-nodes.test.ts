import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING EVENT cannot have multiple ›took-place-at-race-track‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const raceTracksAmount = 3
    const raceTracks = await seedNodes(NodeTypeEnum.RACE_TRACK, raceTracksAmount)

    for (const raceTrack of raceTracks) {
        await RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id)
    }

    const relationships = await getRelationshipsForSpecificNode(racingEvent.id, DbRelationship.RacingEventTookPlaceAtRaceTrack)

    expect(relationships.length)
        .toBe(1)
})
