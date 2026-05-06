import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: false,
        full_name: false,
        founded: false,
        defunct: false,
        wmi: false,
        hsn: false,
        country_code: false,
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
            name: false,
            full_name: false,
            founded: false,
            defunct: false,
            wmi: false,
            hsn: false,
            country_code: false,
        })
})
