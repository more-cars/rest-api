import {expect, test} from 'vitest'
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"
import {Image} from "../../../../../src/models/node-types/images/Image"

test('When providing valid data the new node can be created', async () => {
    const inputData = FakeImage.dbInput()
    const createdNode = await Image.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Read-only properties cannot be overridden', async () => {
    const validData = FakeImage.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        name: "NOT_ALLOWED_TO_OVERWRITE",
        description: "NOT_ALLOWED_TO_OVERWRITE",
        creator: "NOT_ALLOWED_TO_OVERWRITE",
        license: "NOT_ALLOWED_TO_OVERWRITE",
        tags: "NOT_ALLOWED_TO_OVERWRITE",
        source: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_original: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_xxl: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_xl: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_l: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_m: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_s: "NOT_ALLOWED_TO_OVERWRITE",
        image_url_xs: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Image.create(data)

    expect(createdNode.attributes)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
