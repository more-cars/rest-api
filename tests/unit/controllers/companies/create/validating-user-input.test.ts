import {describe, expect, test} from 'vitest'
import {CreateCompanyRawInput} from "../../../../../src/controllers/companies/types/CreateCompanyRawInput"
import {validate} from "../../../../../src/controllers/companies/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateCompanyRawInput = {
            name: undefined,
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            legal_headquarters_location: "Munich",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
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

    test('providing valid input', async () => {
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
})
