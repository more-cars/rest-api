import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›took-place-at-race-track‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

    const createdRelationship = await RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.properties.id)
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
