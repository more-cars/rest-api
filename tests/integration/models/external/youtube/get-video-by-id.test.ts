import {describe, expect, test, vi} from "vitest"
import * as yt from "../../../../../src/db/external/youtube/performYouTubeApiRequest"
import {Video} from "../../../../../src/models/node-types/videos/Video"
import {mockYouTubeRequest} from "../../../../_toolbox/mockYouTubeRequest"

describe('Get YouTube video by ID', () => {
    test('when the video does not exist', async () => {
        vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => {
                throw new Error('YouTube request failed')
            })

        await expect(Video.create({
            video_provider: 'youtube',
            external_id: 'YT123456',
        }))
            .rejects
            .toThrow(Error)
    })

    test('when the video does exist', async () => {
        mockYouTubeRequest()

        const video = await Video.create({
            video_provider: 'youtube',
            external_id: 'YT123456',
        })

        expect(video.attributes.video_provider)
            .toEqual('youtube')

        expect(video.attributes.external_id)
            .toEqual('YT123456')
    })
})
