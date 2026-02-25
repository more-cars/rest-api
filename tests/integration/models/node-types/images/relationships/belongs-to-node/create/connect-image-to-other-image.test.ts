import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../../src/models/node-types/images/Image"

test('Attaching an image to another image is not allowed', async () => {
    const imageNode1 = await seedNode(DbNodeType.Image)
    const imageNode2 = await seedNode(DbNodeType.Image)

    await expect(Image.createBelongsToNodeRelationship(imageNode1.properties.id, imageNode2.properties.id))
        .rejects
        .toThrow(Error)
})

