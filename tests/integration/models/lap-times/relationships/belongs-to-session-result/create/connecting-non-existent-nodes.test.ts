import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-session-result‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    await expect(LapTime.createBelongsToSessionResultRelationship(-42, sessionResult.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createBelongsToSessionResultRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
