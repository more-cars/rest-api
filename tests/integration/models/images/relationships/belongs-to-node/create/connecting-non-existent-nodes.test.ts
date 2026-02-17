import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-node‹ relationship with nodes that do not exist', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(Image.createBelongsToNodeRelationship(-42, brand.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createBelongsToNodeRelationship(image.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createBelongsToNodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
