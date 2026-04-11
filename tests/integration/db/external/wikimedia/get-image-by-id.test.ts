import {beforeEach, describe, expect, test, vi} from "vitest"
import * as wm from "../../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {WikimediaFacade} from "../../../../../src/db/external/WikimediaFacade"
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

        await expect(WikimediaFacade.getImageById('1a2b3c4d'))
            .rejects
            .toThrow(Error)
    })

    test('when the image does exist', async () => {
        const spy = vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

        const image = await WikimediaFacade.getImageById('a1b2c3d4')

        expect(spy)
            .toHaveBeenCalledTimes(1)

        expect(image.creator)
            .toEqual(FakeGetWikimediaImageByIdResponse.query.pages[1234].imageinfo[0].user)
    })
})
