import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-session‹ relationship again', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
