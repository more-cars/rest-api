import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"

test('An image can be connected to multiple nodes of the same type', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    const brandNode1 = await seedNode(NodeTypeEnum.BRAND)
    const brandNode2 = await seedNode(NodeTypeEnum.BRAND)
    const brandNode3 = await seedNode(NodeTypeEnum.BRAND)

    const createdRelationship1 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode1.id)
    expect(createdRelationship1).not.toBeFalsy()

    const createdRelationship2 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode2.id)
    expect(createdRelationship2).not.toBeFalsy()

    const createdRelationship3 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode3.id)
    expect(createdRelationship3).not.toBeFalsy()
})
