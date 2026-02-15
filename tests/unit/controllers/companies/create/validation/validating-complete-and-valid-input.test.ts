import {expect, test} from 'vitest'
import {CreateCompanyRawInput} from "../../../../../../src/controllers/companies/types/CreateCompanyRawInput"
import {validate} from "../../../../../../src/controllers/companies/create"

test('validating a complete and valid request', async () => {
    const data: CreateCompanyRawInput = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        legal_headquarters_location: "Munich",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
