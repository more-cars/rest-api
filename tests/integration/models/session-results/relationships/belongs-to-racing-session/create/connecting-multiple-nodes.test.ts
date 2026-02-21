import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A SESSION RESULT cannot have multiple ›belongs-to-racing-session‹ relationships', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SessionResult)
    const racingSessionsAmount = 3
    const racingSessions = await seedNodes(ControllerNodeType.RacingSession, racingSessionsAmount)

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
