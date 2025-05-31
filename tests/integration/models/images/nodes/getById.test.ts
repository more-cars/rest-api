import {Image} from "../../../../../src/models/Image"
import {seedImage} from "../../../../dbSeeding/images/nodes/seedImage"

describe('Image', () => {
    test('Fetching an image that does not exist should return "false"', async () => {
        const expectedNode = false
        const actualNode = await Image.findById(-42)

        expect(actualNode)
            .toEqual(expectedNode)
    })

    test('When the image exists it should be returned', async () => {
        const expectedNode = await seedImage()
        const actualNode = await Image.findById(expectedNode.id as number)

        expect(actualNode)
            .toEqual(expectedNode)
    })
})
