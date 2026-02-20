import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A RACING SESSION can have multiple ›has-session-result‹ relationships', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(ControllerNodeType.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.id,
        RelationshipType.RacingSessionHasSessionResult,
        Neo4jNodeType.SessionResult,
    )

    expect(relationships.length)
        .toBe(sessionResultsAmount)
})
