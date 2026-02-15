import {expect, test} from 'vitest'
import {CreateCompanyRawInput} from "../../../../../../src/controllers/companies/types/CreateCompanyRawInput"
import {validate} from "../../../../../../src/controllers/companies/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateCompanyRawInput = {
        name: "BMW AG",
        founded: undefined,
        defunct: undefined,
        headquarters_location: undefined,
        legal_headquarters_location: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
