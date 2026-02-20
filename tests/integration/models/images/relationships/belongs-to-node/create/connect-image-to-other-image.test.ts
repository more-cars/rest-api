import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"

test('Attaching an image to another image is not allowed', async () => {
    const imageNode1 = await seedNode(ControllerNodeType.IMAGE)
    const imageNode2 = await seedNode(ControllerNodeType.IMAGE)

    await expect(Image.createBelongsToNodeRelationship(imageNode1.properties.id, imageNode2.properties.id))
        .rejects
        .toThrow(Error)
})

