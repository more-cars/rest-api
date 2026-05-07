import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data = {
        video_provider: true,
        external_id: true,
    }

    const result = unmarshalInputData(data, [
        'video_provider',
        'external_id',
    ])

    expect(result)
        .toStrictEqual({
            video_provider: true,
            external_id: true,
        })
})
