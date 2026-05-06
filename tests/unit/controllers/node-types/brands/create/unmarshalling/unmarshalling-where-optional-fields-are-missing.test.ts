import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
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
            full_name: "Bayerische Motoren Werke",
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined,
            country_code: undefined,
        })
})
