import {describe, expect, test} from 'vitest'
import {CreateCompanyInput} from "../../../../../../src/models/node-types/companies/types/CreateCompanyInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateCompanyInput = {
            name: "   BMW AG  ",
            founded: 1916,
            defunct: null,
            headquarters_location: "   Munich  ",
            hq_country_code: "   DE  ",
            legal_headquarters_location: "   Munich  ",
            legal_hq_country_code: "   DE  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'founded',
            'defunct',
            'headquarters_location',
            'hq_country_code',
            'legal_headquarters_location',
            'legal_hq_country_code',
        ])

        expect(result)
            .toStrictEqual({
                name: "BMW AG",
                founded: 1916,
                defunct: null,
                headquarters_location: "Munich",
                hq_country_code: "DE",
                legal_headquarters_location: "Munich",
                legal_hq_country_code: "DE",
            })
    })
})
