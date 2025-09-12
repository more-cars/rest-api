import {expect, test} from 'vitest'
import {sanitize} from "../../../../../../src/controllers/companies/create"
import {CreateCompanyInput} from "../../../../../../src/models/companies/types/CreateCompanyInput"

test('leading and trailing whitespaces are removed from all properties of type "string"', async () => {
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
