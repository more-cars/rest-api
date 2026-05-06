import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        image_provider: true,
        external_id: 54570839725,
    }

    const result = unmarshalInputData(data, [
        'image_provider',
        'external_id',
    ])

    expect(result)
        .toStrictEqual({
            image_provider: true,
            external_id: 54570839725,
        })
})
