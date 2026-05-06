import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
        my_property: "Hello",
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
