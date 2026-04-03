import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/videos/marshalling/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
        })
})
