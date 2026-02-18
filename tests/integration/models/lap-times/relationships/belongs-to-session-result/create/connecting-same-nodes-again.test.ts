import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-session-result‹ relationship again', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.id, sessionResult.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.id, sessionResult.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
