import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-racing-session‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const racingSession = await seedNode(DbNodeType.RacingSession)

    const createdRelationship = await SessionResult.createBelongsToRacingSessionRelationship(sessionResult.properties.id, racingSession.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(sessionResult.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(racingSession.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.SessionResultBelongsToRacingSession)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
