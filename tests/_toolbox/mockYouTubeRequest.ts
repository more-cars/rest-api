import {vi} from "vitest"
import * as yt from "../../src/db/external/youtube/performYouTubeApiRequest"
import {FakeGetVideoByIdResponse} from "./fixtures/external/youtube/FakeGetVideoByIdResponse"

export function mockYouTubeRequest() {
    return vi.spyOn(yt, 'performYouTubeApiRequest')
        .mockImplementation(async () => FakeGetVideoByIdResponse)
}
