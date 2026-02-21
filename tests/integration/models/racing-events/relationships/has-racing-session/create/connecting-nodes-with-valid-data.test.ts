import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-racing-session‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

    const createdRelationship = await RacingEvent.createHasRacingSessionRelationship(racingEvent.properties.id, racingSession.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingEvent.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(racingSession.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventHasRacingSession)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
