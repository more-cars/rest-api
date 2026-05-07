import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateVideoRawInput} from "../../../../../../../src/controllers/node-types/videos/types/CreateVideoRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateVideoRawInput = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
    }

    const result = unmarshalInputData(data, [
        'video_provider',
        'external_id',
    ])

    expect(result)
        .toStrictEqual({
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
        })
})
