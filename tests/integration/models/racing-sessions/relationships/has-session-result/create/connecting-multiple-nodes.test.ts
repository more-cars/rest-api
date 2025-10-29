import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING SESSION can have multiple ›has-session-result‹ relationships', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(NodeTypeEnum.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id)
    }

    const relationships = await getRelationshipCollection(racingSession.id, DbRelationship.RacingSessionHasSessionResult)

    expect(relationships.length)
        .toBe(sessionResultsAmount)
})
