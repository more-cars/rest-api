import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/videos/marshalling/unmarshalInputData"
import type {CreateVideoRawInput} from "../../../../../../../src/controllers/node-types/videos/types/CreateVideoRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateVideoRawInput = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
        })
})
