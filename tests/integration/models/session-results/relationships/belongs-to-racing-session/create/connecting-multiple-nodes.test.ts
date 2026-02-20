import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A SESSION RESULT cannot have multiple ›belongs-to-racing-session‹ relationships', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const racingSessionsAmount = 3
    const racingSessions = await seedNodes(ControllerNodeType.RACING_SESSION, racingSessionsAmount)

    for (const racingSession of racingSessions) {
        await SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.id,
        RelationshipType.SessionResultBelongsToRacingSession,
        Neo4jNodeType.RacingSession,
    )

    expect(relationships.length)
        .toBe(1)
})
