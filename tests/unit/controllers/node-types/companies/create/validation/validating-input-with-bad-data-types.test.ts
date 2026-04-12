import {expect, test} from 'vitest'
import {CreateCompanyRawInput} from "../../../../../../../src/controllers/node-types/companies/types/CreateCompanyRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/companies/create"

test.each([
    [true, 1916, 2345, "Munich", "DE", "Munich", "DE"],
    ["BMW AG", false, 2345, "Munich", "DE", "Munich", "DE"],
    ["BMW AG", 1916, false, "Munich", "DE", "Munich", "DE"],
    ["BMW AG", 1916, 2345, false, "DE", "Munich", "DE"],
    ["BMW AG", 1916, 2345, "Munich", false, "Munich", "DE"],
    ["BMW AG", 1916, 2345, "Munich", "DE", false, "DE"],
    ["BMW AG", 1916, 2345, "Munich", "DE", "Munich", false],
])('validating a request where the fields have invalid data types', async (
    name, founded, defunct, headquarters_location, hq_country_code, legal_headquarters_location, legal_hq_country_code
) => {
    const data: CreateCompanyRawInput = {
        name,
        founded,
        defunct,
        headquarters_location,
        hq_country_code,
        legal_headquarters_location,
        legal_hq_country_code,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
