import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-lap-time‹ relationship again', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
