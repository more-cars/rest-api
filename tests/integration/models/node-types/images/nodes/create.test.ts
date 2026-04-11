import {expect, test, vi} from 'vitest'
import {FakeImage} from "../../../../../_toolbox/fixtures/nodes/FakeImage"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import * as wm from "../../../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {FakeGetWikimediaImageByIdResponse} from "../../../../../_toolbox/fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"
import {faker} from "@faker-js/faker"
import {WikimediaImageAlreadyExistsError} from "../../../../../../src/models/types/WikimediaImageAlreadyExistsError"

test('When providing valid data the new node can be created', async () => {
    vi.spyOn(wm, 'performWikimediaApiRequest')
        .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

    const inputData = FakeImage.dbInputMinimal
    const createdNode = await Image.create(inputData)

    expect(createdNode.attributes.external_id)
        .toEqual(inputData.external_id)
})

test('Read-only properties cannot be overridden', async () => {
    vi.spyOn(wm, 'performWikimediaApiRequest')
        .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

    const validData = FakeImage.dbInput
    validData.external_id = faker.string.uuid() // TODO update FakeImage to return a fresh set of data (instead of cached)
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

test('Trying to add the same Wikimedia image again', async () => {
    vi.spyOn(wm, 'performWikimediaApiRequest')
        .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

    const inputData = FakeImage.dbInput
    inputData.external_id = faker.string.uuid() // TODO update FakeImage to return a fresh set of data (instead of cached)

    await Image.create(inputData)

    await expect(Image.create(inputData))
        .rejects
        .toThrow(WikimediaImageAlreadyExistsError)
})
