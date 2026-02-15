import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Image does not exist', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Image.deleteBelongsToNodeRelationship(image.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Partner node does not exist', async () => {
    const partnerNode = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Image.deleteBelongsToNodeRelationship(-42, partnerNode.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(Image.deleteBelongsToNodeRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})