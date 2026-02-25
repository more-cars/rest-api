import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING SESSION can have multiple ›has-session-result‹ relationships', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(DbNodeType.SessionResult, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await RacingSession.createHasSessionResultRelationship(racingSession.properties.id, sessionResult.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.properties.id,
        RelationshipType.RacingSessionHasSessionResult,
        DbNodeType.SessionResult,
    )

    expect(relationships.length)
        .toBe(sessionResultsAmount)
})
