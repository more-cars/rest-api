import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-racing-session‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SessionResult)
    const racingSession = await seedNode(ControllerNodeType.RacingSession)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(-42, racingSession.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
