import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›took-place-at-race-track‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(-42, raceTrack.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
