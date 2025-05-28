import {deleteAllImages} from "../../../../dbSeeding/deleteAllImages"
import {seedImages} from "../../../../dbSeeding/seedImages"
import {ImageNode} from "../../../../../src/types/images/ImageNode"
import {Image} from "../../../../../src/models/Image"

describe("Images", () => {
    test('When there are no images then an empty array should be returned', async () => {
        await deleteAllImages()

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('When images exist then all of them should be returned', async () => {
        await deleteAllImages()
        const amount = Math.ceil(Math.random() * 50)
        await seedImages(amount)

        const nodes = await Image.findAll()

        expect(nodes.length)
            .toEqual(amount)
    })
})
