import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "PlayStation 5",
    }

    const result = unmarshalInputData(data, [
        'name',
        'release_year',
        'manufacturer',
    ])

    expect(result)
        .toStrictEqual({
            name: "PlayStation 5",
            release_year: undefined,
            manufacturer: undefined,
        })
})
