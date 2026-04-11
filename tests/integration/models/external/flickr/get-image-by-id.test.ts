import {describe, expect, test, vi} from "vitest"
import * as fl from "../../../../../src/db/external/flickr/performFlickrApiRequest"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {mockFlickrRequest} from "../../../../_toolbox/mockFlickrRequest"

describe('Get Flickr image by ID', () => {
    test('when the image does not exist', async () => {
        vi.spyOn(fl, 'performFlickrApiRequest')
            .mockImplementation(async () => {
                throw new Error('Flickr request failed')
            })

        await expect(Image.create({
            image_provider: 'flickr',
            external_id: 'FL123456',
        }))
            .rejects
            .toThrow(Error)
    })

    test('when the image does exist', async () => {
        mockFlickrRequest()

        const image = await Image.create({
            image_provider: 'flickr',
            external_id: 'FL123456',
        })

        expect(image.attributes.image_provider)
            .toEqual('flickr')

        expect(image.attributes.external_id)
            .toEqual('FL123456')
    })
})
