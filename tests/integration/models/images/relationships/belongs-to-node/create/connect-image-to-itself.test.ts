import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"

test('Attaching an image to itself is not allowed', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Image.createBelongsToNodeRelationship(imageNode.id, imageNode.id))
        .rejects
        .toThrow(Error)
})
