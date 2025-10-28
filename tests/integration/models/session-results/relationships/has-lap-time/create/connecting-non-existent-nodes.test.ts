import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-lap-time‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    await expect(SessionResult.createHasLapTimeRelationship(-42, lapTime.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasLapTimeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
