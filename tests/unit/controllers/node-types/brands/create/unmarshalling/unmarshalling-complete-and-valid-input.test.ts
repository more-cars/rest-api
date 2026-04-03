import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/brands/marshalling/unmarshalInputData"
import type {CreateBrandRawInput} from "../../../../../../../src/controllers/node-types/brands/types/CreateBrandRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateBrandRawInput = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: 2222,
            wmi: "WBA",
            hsn: "0005",
        })
})
