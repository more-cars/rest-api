import {beforeEach, describe, expect, test, vi} from "vitest"
import * as wm from "../../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {FakeGetWikimediaImageByIdResponse} from "../../../../_toolbox/fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Get Wikimedia image by ID', () => {
    test('when the image does not exist', async () => {
        vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => {
                throw new Error('Wikimedia request failed')
            })

        await expect(Image.create({
            image_provider: 'wikimedia',
            external_id: 'WM123456',
        }))
            .rejects
            .toThrow(Error)
    })

    test('when the image does exist', async () => {
        const spy = vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

        const image = await Image.create({
            image_provider: 'wikimedia',
            external_id: 'WM123456',
        })

        expect(spy)
            .toHaveBeenCalledTimes(1)

        expect(image.attributes.image_provider)
            .toEqual('wikimedia')

        expect(image.attributes.external_id)
            .toEqual('WM123456')
    })
})
