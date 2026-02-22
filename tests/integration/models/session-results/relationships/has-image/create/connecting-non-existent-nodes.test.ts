import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const image = await seedNode(DbNodeType.Image)

    await expect(SessionResult.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasImageRelationship(sessionResult.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
