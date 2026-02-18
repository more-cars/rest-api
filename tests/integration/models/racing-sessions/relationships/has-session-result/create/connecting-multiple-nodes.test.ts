import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING SESSION can have multiple ›has-session-result‹ relationships', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(NodeTypeEnum.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.id,
        RelationshipType.RacingSessionHasSessionResult,
        NodeTypeLabel.SessionResult,
    )

    expect(relationships.length)
        .toBe(sessionResultsAmount)
})
