import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A SESSION RESULT cannot have multiple ›belongs-to-racing-session‹ relationships', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const racingSessionsAmount = 3
    const racingSessions = await seedNodes(DbNodeType.RacingSession, racingSessionsAmount)

    for (const racingSession of racingSessions) {
        await SessionResult.createBelongsToRacingSessionRelationship(sessionResult.properties.id, racingSession.properties.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.properties.id,
        RelationshipType.SessionResultBelongsToRacingSession,
        DbNodeType.RacingSession,
    )

    expect(relationships.length)
        .toBe(1)
})
