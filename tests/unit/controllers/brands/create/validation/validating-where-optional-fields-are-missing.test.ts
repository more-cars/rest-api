import {expect, test} from 'vitest'
import {CreateBrandRawInput} from "../../../../../../src/controllers/node-types/brands/types/CreateBrandRawInput"
import {validate} from "../../../../../../src/controllers/node-types/brands/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateBrandRawInput = {
        name: "BMW",
        full_name: undefined,
        founded: undefined,
        defunct: undefined,
        wmi: undefined,
        hsn: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
