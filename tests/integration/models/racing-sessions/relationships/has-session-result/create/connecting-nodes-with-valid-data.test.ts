import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-session-result‹ relationship with valid data', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    const createdRelationship = await RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingSession.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSessionHasSessionResult)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
