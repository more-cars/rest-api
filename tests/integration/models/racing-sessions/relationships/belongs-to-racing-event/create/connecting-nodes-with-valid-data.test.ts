import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-racing-event‹ relationship with valid data', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    const createdRelationship = await RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingSession.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSessionBelongsToRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
