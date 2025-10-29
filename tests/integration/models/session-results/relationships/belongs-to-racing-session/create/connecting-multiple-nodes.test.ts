import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A SESSION RESULT cannot have multiple ›belongs-to-racing-session‹ relationships', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const racingSessionsAmount = 3
    const racingSessions = await seedNodes(NodeTypeEnum.RACING_SESSION, racingSessionsAmount)

    for (const racingSession of racingSessions) {
        await SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id)
    }

    const relationships = await getRelationshipCollection(sessionResult.id, DbRelationship.SessionResultBelongsToRacingSession)

    expect(relationships.length)
        .toBe(1)
})
