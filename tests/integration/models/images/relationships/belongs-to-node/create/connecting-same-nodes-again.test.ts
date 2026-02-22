import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-node‹ relationship again', async () => {
    const image = await seedNode(DbNodeType.Image)
    const brand = await seedNode(DbNodeType.Brand)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
