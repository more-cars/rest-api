import {seedImage} from "../../../../../dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../src/models/images/Image"

test('Attaching an image to itself is not allowed', async () => {
    const imageNode = await seedImage()

    await expect(Image.createBelongsToNodeRelationship(imageNode.id, imageNode.id))
        .rejects
        .toThrow(Error)
})
