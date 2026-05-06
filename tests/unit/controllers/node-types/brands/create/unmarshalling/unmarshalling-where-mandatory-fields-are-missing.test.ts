import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
        country_code: "DE",
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
            name: undefined,
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: 2222,
            wmi: "WBA",
            hsn: "0005",
            country_code: "DE",
        })
})
