import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-lap-time‹ relationship again', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.id, lapTime.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.id, lapTime.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
