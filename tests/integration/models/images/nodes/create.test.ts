import {Image} from "../../../../../src/models/Image"
import FakeImage from "../../../../fixtures/nodes/FakeImage"

describe('Image', () => {
    test('When providing valid data the new node can be created', async () => {
        const createdNode = await Image.create(FakeImage)

        expect(createdNode)
            .toEqual(expect.objectContaining(FakeImage))
    })

    test('Read-only properties cannot be overridden', async () => {
        const validData = FakeImage
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

        expect(createdNode)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
