import {describe, expect, test} from 'vitest'
import {mockWikimediaRequest} from "../../../../../_toolbox/mockWikimediaRequest"
import {FakeImage} from "../../../../../_toolbox/fixtures/nodes/FakeImage"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import type {ImageInput} from "../../../../../../src/models/node-types/images/types/ImageInput"
import {WikimediaImageAlreadyExistsError} from "../../../../../../src/models/types/WikimediaImageAlreadyExistsError"

describe('Create Image - Wikimedia', () => {
    test('When providing valid data then the new node is created', async () => {
        mockWikimediaRequest()

        const inputData = FakeImage.dbInputMinimal()
        const createdNode = await Image.create(inputData as ImageInput)

        expect(createdNode.attributes.external_id)
            .toEqual(inputData.external_id)
    })

    test('Read-only properties cannot be overridden', async () => {
        mockWikimediaRequest()

        const validData = FakeImage.dbInputMinimal()
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
        const data = Object.assign(validData, readOnlyData) as unknown as ImageInput
        const createdNode = await Image.create(data)

        expect(createdNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })

    test('Trying to add the same image again', async () => {
        mockWikimediaRequest()

        const inputData = FakeImage.dbInputMinimal()

        await Image.create(inputData as ImageInput)

        await expect(Image.create(inputData as ImageInput))
            .rejects
            .toThrow(WikimediaImageAlreadyExistsError)
    })
})
