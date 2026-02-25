import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../../src/models/node-types/images/Image"

test('Attaching an image to itself is not allowed', async () => {
    const imageNode = await seedNode(DbNodeType.Image)

    await expect(Image.createBelongsToNodeRelationship(imageNode.properties.id, imageNode.properties.id))
        .rejects
        .toThrow(Error)
})
