import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(SessionResult.createHasImageRelationship(sessionResult.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(SessionResult.createHasImageRelationship(sessionResult.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
