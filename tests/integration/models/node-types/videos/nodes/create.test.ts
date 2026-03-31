import {expect, test, vi} from 'vitest'
import * as yt from "../../../../../../src/db/external/youtube/performYouTubeApiRequest"
import {FakeGetVideoByIdResponse} from "../../../../../_toolbox/fixtures/external/youtube/FakeGetVideoByIdResponse"
import {FakeVideo} from "../../../../../_toolbox/fixtures/nodes/FakeVideo"
import {Video} from "../../../../../../src/models/node-types/videos/Video"

test('Expecting node to be created when provided with valid data', async () => {
    vi.spyOn(yt, 'performYouTubeApiRequest')
        .mockImplementation(async () => FakeGetVideoByIdResponse)

    const inputData = FakeVideo.dbInput
    const createdNode = await Video.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    vi.spyOn(yt, 'performYouTubeApiRequest')
        .mockImplementation(async () => FakeGetVideoByIdResponse)

    const validData = FakeVideo.dbInput
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
