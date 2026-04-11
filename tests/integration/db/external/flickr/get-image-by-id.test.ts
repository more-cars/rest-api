import {describe, expect, test, vi} from "vitest"
import * as fl from "../../../../../src/db/external/flickr/performFlickrApiRequest"
import {FlickrFacade} from "../../../../../src/db/external/FlickrFacade"
import {FakeGetFlickrImageByIdResponse} from "../../../../_toolbox/fixtures/external/flickr/FakeGetFlickrImageByIdResponse"
import {mockFlickrRequest} from "../../../../_toolbox/mockFlickrRequest"

describe('Get Flickr image by ID', () => {
    test('when the image does not exist', async () => {
        vi.spyOn(fl, 'performFlickrApiRequest')
            .mockImplementation(async () => {
                throw new Error('Flickr request failed')
            })

        await expect(FlickrFacade.getImageById('1a2b3c4d'))
            .rejects
            .toThrow(Error)
    })

    test('when the image does exist', async () => {
        mockFlickrRequest()

        const image = await FlickrFacade.getImageById('a1b2c3d4')

        expect(image.creator)
            .toEqual(FakeGetFlickrImageByIdResponse.photo.owner.username)
    })
})
