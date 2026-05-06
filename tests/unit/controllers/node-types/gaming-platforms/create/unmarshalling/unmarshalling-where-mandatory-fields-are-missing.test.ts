import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {}

    const result = unmarshalInputData(data, [
        'name',
        'release_year',
        'manufacturer',
    ])

    expect(result)
        .toStrictEqual({
            name: undefined,
            release_year: undefined,
            manufacturer: undefined,
        })
})
