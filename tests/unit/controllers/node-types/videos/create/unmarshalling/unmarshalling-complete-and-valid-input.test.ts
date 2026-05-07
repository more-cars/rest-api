import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
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
