import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-session-result‹ relationship again', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
