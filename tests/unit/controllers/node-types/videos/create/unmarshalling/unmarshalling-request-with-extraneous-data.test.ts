import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
        my_property: "Hello",
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
