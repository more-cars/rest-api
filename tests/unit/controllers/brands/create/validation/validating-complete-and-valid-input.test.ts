import {expect, test} from 'vitest'
import {CreateBrandRawInput} from "../../../../../../src/controllers/brands/types/CreateBrandRawInput"
import {validate} from "../../../../../../src/controllers/brands/create"

test('validating a complete and valid request', async () => {
    const data: CreateBrandRawInput = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
