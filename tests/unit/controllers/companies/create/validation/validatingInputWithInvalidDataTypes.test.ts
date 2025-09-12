import {expect, test} from 'vitest'
import {validate} from "../../../../../../src/controllers/companies/create"
import type {CreateCompanyRawInput} from "../../../../../../src/controllers/companies/types/CreateCompanyRawInput"

test.each([
    // ["BMW AG", 1916, null, "Munich", "Munich"], // VALID data for reference
    [true, 1916, null, "Munich", "Munich"],
    ["BMW AG", true, null, "Munich", "Munich"],
    ["BMW AG", 1916, true, "Munich", "Munich"],
    ["BMW AG", 1916, null, true, "Munich"],
    ["BMW AG", 1916, null, "Munich", true],
])('validating a request where the data types are incorrect', async (
    name, founded, defunct, headquarters_location, legal_headquarters_location
) => {
    const data: CreateCompanyRawInput = {
        name, founded, defunct, headquarters_location, legal_headquarters_location
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
