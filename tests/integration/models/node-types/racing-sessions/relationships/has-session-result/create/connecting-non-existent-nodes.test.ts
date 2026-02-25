import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-session-result‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const sessionResult = await seedNode(DbNodeType.SessionResult)

    await expect(RacingSession.createHasSessionResultRelationship(-42, sessionResult.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasSessionResultRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
