import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›took-place-at-race-track‹ relationship again', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
