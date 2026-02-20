import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›took-place-at-race-track‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

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
