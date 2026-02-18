import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-session-result‹ relationship with valid data', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    const createdRelationship = await RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingSession.id)
    expect(createdRelationship.destination.id)
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
