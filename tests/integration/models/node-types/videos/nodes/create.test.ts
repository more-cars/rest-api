import {expect, test, vi} from 'vitest'
import {faker} from "@faker-js/faker"
import * as yt from "../../../../../../src/db/external/youtube/performYouTubeApiRequest"
import {FakeGetVideoByIdResponse} from "../../../../../_toolbox/fixtures/external/youtube/FakeGetVideoByIdResponse"
import {FakeVideo} from "../../../../../_toolbox/fixtures/nodes/FakeVideo"
import {Video} from "../../../../../../src/models/node-types/videos/Video"
import {YouTubeVideoAlreadyExistsError} from "../../../../../../src/models/types/YouTubeVideoAlreadyExistsError"

test('Expecting node to be created when provided with valid data', async () => {
    vi.spyOn(yt, 'performYouTubeApiRequest')
        .mockImplementation(async () => FakeGetVideoByIdResponse)

    const inputData = FakeVideo.dbInput
    const createdNode = await Video.create(inputData)

    expect(createdNode.attributes.external_id)
        .toEqual(inputData.external_id)
})

test('Trying to override read-only properties', async () => {
    vi.spyOn(yt, 'performYouTubeApiRequest')
        .mockImplementation(async () => FakeGetVideoByIdResponse)

    const validData = FakeVideo.dbInput
    validData.external_id = faker.string.uuid() // TODO update FakeVideo to return a fresh set of data (instead of cached)
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Video.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})

test('Trying to add the same YouTube video again', async () => {
    vi.spyOn(yt, 'performYouTubeApiRequest')
        .mockImplementation(async () => FakeGetVideoByIdResponse)

    const inputData = FakeVideo.dbInput
    inputData.external_id = faker.string.uuid() // TODO update FakeVideo to return a fresh set of data (instead of cached)

    await Video.create(inputData)

    await expect(Video.create(inputData))
        .rejects
        .toThrow(YouTubeVideoAlreadyExistsError)
})
