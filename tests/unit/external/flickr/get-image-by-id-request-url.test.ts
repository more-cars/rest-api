import {expect, test} from "vitest"
import {getImageByIdRequestUrl, getThumbnailsRequestUrl} from "../../../../src/db/external/flickr/getImageById"

test('Get Flickr image - Request URL is correctly assembled', async () => {
    expect(getImageByIdRequestUrl('1a2b3c4d', '123'))
        .to.equal(`https://api.flickr.com/services/rest/?api_key=123&format=json&nojsoncallback=1&method=flickr.photos.getInfo&photo_id=1a2b3c4d`)
})

test('Get Flickr thumbnails - Request URL is correctly assembled', async () => {
    expect(getThumbnailsRequestUrl('1a2b3c4d', '123'))
        .to.equal(`https://api.flickr.com/services/rest/?api_key=123&format=json&nojsoncallback=1&method=flickr.photos.getSizes&photo_id=1a2b3c4d`)
})
