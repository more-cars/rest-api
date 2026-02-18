import {expect, test} from 'vitest'
import {CreateBrandRawInput} from "../../../../../../src/controllers/node-types/brands/types/CreateBrandRawInput"
import {validate} from "../../../../../../src/controllers/node-types/brands/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateBrandRawInput = {
        name: undefined,
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
