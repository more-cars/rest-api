import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Image does not exist', async () => {
    const image = await seedNode('image')

    await expect(Image.deleteBelongsToNodeRelationship(image.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Partner node does not exist', async () => {
    const partnerNode = await seedNode('company')

    await expect(Image.deleteBelongsToNodeRelationship(-42, partnerNode.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(Image.deleteBelongsToNodeRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})