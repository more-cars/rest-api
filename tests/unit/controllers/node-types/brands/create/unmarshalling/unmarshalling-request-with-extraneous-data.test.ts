import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "BMW",
        id: 42,
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
        'name',
        'full_name',
        'founded',
        'defunct',
        'wmi',
        'hsn',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: undefined,
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined,
            country_code: undefined,
        })
})
