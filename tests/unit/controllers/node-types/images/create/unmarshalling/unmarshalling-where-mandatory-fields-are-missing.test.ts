import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data = {}

    const result = unmarshalInputData(data, [
        'image_provider',
        'external_id',
    ])

    expect(result)
        .toStrictEqual({
            image_provider: undefined,
            external_id: undefined,
        })
})
