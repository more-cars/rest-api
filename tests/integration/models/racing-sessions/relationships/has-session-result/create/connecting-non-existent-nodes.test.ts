import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-session-result‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

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
