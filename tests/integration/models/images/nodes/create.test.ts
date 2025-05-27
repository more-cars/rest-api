import {Image} from "../../../../../src/models/Image"
import FakeImage from "../../../../fixtures/nodes/FakeImage"

describe('Image', () => {
    test('When providing valid data the new node can be created', async () => {
        const createdNode = await Image.create(FakeImage)

        expect(createdNode)
            .toEqual(expect.objectContaining(FakeImage))
    })
})
