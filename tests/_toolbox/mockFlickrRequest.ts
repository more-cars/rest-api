import {vi} from "vitest"
import * as fl from "../../src/db/external/flickr/performFlickrApiRequest"
import {FakeGetFlickrImageByIdResponse} from "./fixtures/external/flickr/FakeGetFlickrImageByIdResponse"
import {FakeGetFlickrImageThumbnailsResponse} from "./fixtures/external/flickr/FakeGetFlickrImageThumbnailsResponse"

export function mockFlickrRequest() {
    return vi.spyOn(fl, 'performFlickrApiRequest')
        .mockImplementation(async (url) => {
            if (url.includes('getInfo')) {
                return FakeGetFlickrImageByIdResponse
            } else if (url.includes('getSizes')) {
                return FakeGetFlickrImageThumbnailsResponse
            }
        })
}
