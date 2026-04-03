import {beforeEach, describe, expect, test, vi} from "vitest"
import * as yt from "../../../../../src/db/external/youtube/performYouTubeApiRequest"
import {FakeGetVideoByIdResponse} from "../../../../_toolbox/fixtures/external/youtube/FakeGetVideoByIdResponse"
import {Video} from "../../../../../src/models/node-types/videos/Video"
import {YouTubeVideoNotFoundError} from "../../../../../src/models/types/YouTubeVideoNotFoundError"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Get YouTube video by ID', () => {
    test('when the video does not exist', async () => {
        vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => {
                throw new Error('YouTube video not found')
            })

        await expect(Video.create({
            video_provider: 'youtube',
            external_id: 'YT123456',
        }))
            .rejects
            .toThrow(YouTubeVideoNotFoundError)
    })

    test('when the video does exist', async () => {
        const spy = vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => FakeGetVideoByIdResponse)

        const video = await Video.create({
            video_provider: 'youtube',
            external_id: 'YT123456',
        })

        expect(spy)
            .toHaveBeenCalledTimes(1)

        expect(video.attributes.video_provider)
            .toEqual('youtube')

        expect(video.attributes.external_id)
            .toEqual('YT123456')
    })
})
