import {describe, expect, test} from 'vitest'
import {CreateCompanyInput} from "../../../../../src/models/node-types/companies/types/CreateCompanyInput"
import {sanitize} from "../../../../../src/controllers/node-types/companies/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateCompanyInput = {
            name: "   BMW AG  ",
            founded: 1916,
            defunct: null,
            headquarters_location: "   Munich  ",
            legal_headquarters_location: "   Munich  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "BMW AG",
                founded: 1916,
                defunct: null,
                headquarters_location: "Munich",
                legal_headquarters_location: "Munich",
            })
    })
})
