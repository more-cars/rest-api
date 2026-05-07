import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = unmarshalInputData(data, [
        'name',
        'release_year',
        'manufacturer',
    ])

    expect(result)
        .toStrictEqual({
            name: "PlayStation 5",
            release_year: 2020,
            manufacturer: "Sony",
        })
})
