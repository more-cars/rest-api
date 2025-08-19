import {expect, test} from 'vitest'
import {Image} from "../../../../../src/models/images/Image"
import {seedImage} from "../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('Deleting an image that does not exist should return "false"', async () => {
    const success = await Image.delete(-42)

    expect(success)
        .toEqual(false)
})

test('When the image exists it should be deleted', async () => {
    const node = await seedImage()
    const success = await Image.delete(node.id)

    expect(success)
        .toEqual(true)
})
