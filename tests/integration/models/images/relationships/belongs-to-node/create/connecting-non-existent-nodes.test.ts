import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-node‹ relationship with nodes that do not exist', async () => {
    const image = await seedNode(DbNodeType.Image)
    const brand = await seedNode(DbNodeType.Brand)

    await expect(Image.createBelongsToNodeRelationship(-42, brand.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createBelongsToNodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
