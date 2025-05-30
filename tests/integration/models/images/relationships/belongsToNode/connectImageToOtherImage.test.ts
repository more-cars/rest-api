import {seedImage} from "../../../../../dbSeeding/seedImage"
import {Image} from "../../../../../../src/models/Image"

describe('Image', () => {
    test('Attaching an image to another image is not allowed', async () => {
        const imageNode1 = await seedImage()
        const imageNode2 = await seedImage()

        await expect(Image.createBelongsToNodeRelationship(imageNode1.id, imageNode2.id))
            .rejects
            .toThrow(Error)
    })
})
