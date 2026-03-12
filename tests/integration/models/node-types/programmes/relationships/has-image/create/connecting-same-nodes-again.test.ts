import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const image = await seedNode(DbNodeType.Image)

    await expect(Programme.createHasImageRelationship(programme.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Programme.createHasImageRelationship(programme.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
