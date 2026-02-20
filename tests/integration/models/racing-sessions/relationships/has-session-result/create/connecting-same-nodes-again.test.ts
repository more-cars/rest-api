import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-session-result‹ relationship again', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
