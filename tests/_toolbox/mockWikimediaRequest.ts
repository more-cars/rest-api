import {vi} from "vitest"
import * as wm from "../../src/db/external/wikimedia/performWikimediaApiRequest"
import {FakeGetWikimediaImageByIdResponse} from "./fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"

export function mockWikimediaRequest() {
    return vi.spyOn(wm, 'performWikimediaApiRequest')
        .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)
}
