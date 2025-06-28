import {Image} from "../../../../../src/models/images/Image"
import {seedImage} from "../../../../dbSeeding/images/nodes/seedImage"

test('Fetching an image that does not exist should return "false"', async () => {
    const expectedNode = false
    const actualNode = await Image.findById(-42)

    expect(actualNode)
        .toEqual(expectedNode)
})

test('When the image exists it should be returned', async () => {
    const expectedNode = await seedImage()
    const actualNode = await Image.findById(expectedNode.id)

    expect(actualNode)
        .toEqual(expectedNode)
})

