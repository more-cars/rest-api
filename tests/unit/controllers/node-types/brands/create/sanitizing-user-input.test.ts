import {describe, expect, test} from 'vitest'
import {BrandInput} from "../../../../../../src/models/node-types/brands/types/BrandInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: BrandInput = {
            name: "     BMW     ",
            full_name: "Bayerische Motoren Werke     ",
            founded: 1916,
            defunct: null,
            wmi: "WBA",
            hsn: "    0005",
            country_code: "    DE",
        }

        const result = unmarshalInputData(data, [
            'name',
            'full_name',
            'founded',
            'defunct',
            'wmi',
            'hsn',
            'country_code',
        ])

        expect(result)
            .toStrictEqual({
                name: "BMW",
                full_name: "Bayerische Motoren Werke",
                founded: 1916,
                defunct: null,
                wmi: "WBA",
                hsn: "0005",
                country_code: "DE",
            })
    })
})
