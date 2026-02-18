import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›took-place-at-race-track‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    const createdRelationship = await RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.id)
        .toEqual(raceTrack.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventTookPlaceAtRaceTrack)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
