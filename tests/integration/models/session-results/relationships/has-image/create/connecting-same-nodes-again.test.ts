import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const image = await seedNode(DbNodeType.Image)

    await expect(SessionResult.createHasImageRelationship(sessionResult.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createHasImageRelationship(sessionResult.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
