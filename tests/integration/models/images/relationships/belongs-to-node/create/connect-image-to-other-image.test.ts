import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"

test('Attaching an image to another image is not allowed', async () => {
    const imageNode1 = await seedNode(NodeTypeEnum.IMAGE)
    const imageNode2 = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Image.createBelongsToNodeRelationship(imageNode1.id, imageNode2.id))
        .rejects
        .toThrow(Error)
})

