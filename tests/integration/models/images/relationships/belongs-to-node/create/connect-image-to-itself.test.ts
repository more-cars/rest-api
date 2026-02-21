import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"

test('Attaching an image to itself is not allowed', async () => {
    const imageNode = await seedNode(ControllerNodeType.Image)

    await expect(Image.createBelongsToNodeRelationship(imageNode.properties.id, imageNode.properties.id))
        .rejects
        .toThrow(Error)
})
