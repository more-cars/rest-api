import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-session-result‹ relationship again', async () => {
    const lapTime = await seedNode(ControllerNodeType.LapTime)
    const sessionResult = await seedNode(ControllerNodeType.SessionResult)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, sessionResult.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, sessionResult.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
