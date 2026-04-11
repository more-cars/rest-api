import {expect, test} from "vitest"
import {getVideoByIdRequestUrl} from "../../../../src/db/external/youtube/getVideoById"

test('Get YouTube video - Request URL is correctly assembled', async () => {
    expect(getVideoByIdRequestUrl('1a2b3c4d', 'secret'))
        .to.equal('https://www.googleapis.com/youtube/v3/videos?key=secret&part=snippet,contentDetails,status&id=1a2b3c4d')
})
