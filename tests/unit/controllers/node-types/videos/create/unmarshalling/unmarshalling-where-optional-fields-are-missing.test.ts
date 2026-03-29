import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/videos/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
        })
})
