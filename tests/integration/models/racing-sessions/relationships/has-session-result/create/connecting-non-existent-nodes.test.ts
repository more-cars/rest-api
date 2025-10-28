import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-session-result‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(RacingSession.createHasSessionResultRelationship(-42, sessionResult.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasSessionResultRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
