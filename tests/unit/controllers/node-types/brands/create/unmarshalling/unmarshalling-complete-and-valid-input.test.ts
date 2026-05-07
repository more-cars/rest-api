import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
        name: "BMW",
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
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: 2222,
            wmi: "WBA",
            hsn: "0005",
            country_code: "DE",
        })
})
