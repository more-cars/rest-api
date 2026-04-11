import {beforeEach, describe, expect, test, vi} from "vitest"
import * as yt from "../../../../../src/db/external/youtube/performYouTubeApiRequest"
import {FakeGetVideoByIdResponse} from "../../../../_toolbox/fixtures/external/youtube/FakeGetVideoByIdResponse"
import {YouTubeFacade} from "../../../../../src/db/external/YouTubeFacade"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Get YouTube video by ID', () => {
    test('when the video does not exist', async () => {
        vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => {
                throw new Error('YouTube request failed')
            })

        await expect(YouTubeFacade.getVideoById('1a2b3c4d'))
            .rejects
            .toThrow(Error)
    })

    test('when the video does exist', async () => {
        const spy = vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => FakeGetVideoByIdResponse)

        const video = await YouTubeFacade.getVideoById('1a2b3c4d')

        expect(spy)
            .toHaveBeenCalledTimes(1)

        expect(video.title)
            .toEqual(FakeGetVideoByIdResponse.items[0].snippet.title)

        expect(video.duration)
            .toEqual(FakeGetVideoByIdResponse.items[0].contentDetails.duration)
    })
})
