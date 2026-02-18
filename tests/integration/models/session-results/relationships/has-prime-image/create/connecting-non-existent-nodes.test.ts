import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(SessionResult.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasPrimeImageRelationship(sessionResult.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
