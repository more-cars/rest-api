import {expect, test} from "vitest"
import {getImageByIdRequestUrl} from "../../../../src/db/external/wikimedia/getImageById"

test('Get Wikimedia image - Request URL is correctly assembled', async () => {
    expect(getImageByIdRequestUrl('1a2b3c4d', 123))
        .to.equal('https://commons.wikimedia.org/w/api.php?action=query&format=json&indexpageids&iiurlparam=123px&prop=imageinfo&iiprop=url|mediatype|user|size|extmetadata&titles=File:1a2b3c4d')
})
