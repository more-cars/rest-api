import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-session-result‹ relationship with valid data', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const sessionResult = await seedNode(DbNodeType.SessionResult)

    const createdRelationship = await RacingSession.createHasSessionResultRelationship(racingSession.properties.id, sessionResult.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingSession.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(sessionResult.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSessionHasSessionResult)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
