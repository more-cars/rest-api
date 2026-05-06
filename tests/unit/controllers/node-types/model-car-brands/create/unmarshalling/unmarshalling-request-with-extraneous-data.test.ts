import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
        country_code: 'US',
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
        'name',
        'founded',
        'defunct',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "Hot Wheels",
            founded: 1968,
            defunct: null,
            country_code: 'US',
        })
})
