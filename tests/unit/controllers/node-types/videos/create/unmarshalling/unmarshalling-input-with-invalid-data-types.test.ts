import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/videos/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        video_provider: true,
        external_id: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            video_provider: true,
            external_id: true,
        })
})
