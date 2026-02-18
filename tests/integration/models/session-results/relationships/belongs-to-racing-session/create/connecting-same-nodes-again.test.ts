import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-session‹ relationship again', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
