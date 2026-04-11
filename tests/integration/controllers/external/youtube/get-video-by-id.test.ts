import {beforeEach, describe, expect, test, vi} from "vitest"
import request from "supertest"
import * as yt from "../../../../../src/db/external/youtube/performYouTubeApiRequest"
import {app} from "../../../../../src/app"
import * as video from "../../../../../src/models/node-types/videos/create/videoAlreadyExists"
import {FakeGetVideoByIdResponse} from "../../../../_toolbox/fixtures/external/youtube/FakeGetVideoByIdResponse"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Get YouTube video by ID', () => {
    test('when the video does not exist', async () => {
        const spy = vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => {
                throw new Error('YouTube request failed')
            })

        const response = await request(app)
            .post('/videos')
            .send({
                video_provider: 'youtube',
                external_id: 'YT123456',
            })

        expect(response.statusCode)
            .toBe(422)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })

    test('when the video is already in the database', async () => {
        const spy = vi.spyOn(video, 'videoAlreadyExists')
            .mockImplementation(async () => true)

        const response = await request(app)
            .post('/videos')
            .send({
                video_provider: 'youtube',
                external_id: 'YT123456',
            })

        expect(response.statusCode)
            .toBe(409)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })

    test('when the wrong video platform is provided', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                video_provider: 'theirtube',
                external_id: 'YT123456',
            })

        expect(response.statusCode)
            .toBe(400)
    })

    test('when the video exists and is not in the database yet', async () => {
        const spy = vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => FakeGetVideoByIdResponse)

        const response = await request(app)
            .post('/videos')
            .send({
                video_provider: 'youtube',
                external_id: 'YT123456',
            })

        expect(response.statusCode)
            .toBe(201)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })
})
