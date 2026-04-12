import {expect, test} from 'vitest'
import {CreateCompanyRawInput} from "../../../../../../../src/controllers/node-types/companies/types/CreateCompanyRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/companies/create"

test('validating a complete and valid request', async () => {
    const data: CreateCompanyRawInput = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        hq_country_code: "DE",
        legal_headquarters_location: "Munich",
        legal_hq_country_code: "DE",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
