import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›belongs-to-racing-session‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

    const createdRelationship = await SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id)

    expect(createdRelationship.origin.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingSession.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.SessionResultBelongsToRacingSession)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
