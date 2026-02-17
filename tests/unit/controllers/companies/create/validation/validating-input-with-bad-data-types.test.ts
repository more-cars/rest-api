import {expect, test} from 'vitest'
import {CreateCompanyRawInput} from "../../../../../../src/controllers/companies/types/CreateCompanyRawInput"
import {validate} from "../../../../../../src/controllers/companies/create"

test.each([
    [true, 1916, 2345, "Munich", "Munich"],
    ["BMW AG", false, 2345, "Munich", "Munich"],
    ["BMW AG", 1916, false, "Munich", "Munich"],
    ["BMW AG", 1916, 2345, false, "Munich"],
    ["BMW AG", 1916, 2345, "Munich", false],
])('validating a request where the fields have invalid data types', async (
    name, founded, defunct, headquarters_location, legal_headquarters_location
) => {
    const data: CreateCompanyRawInput = {
        name,
        founded,
        defunct,
        headquarters_location,
        legal_headquarters_location,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
