import {describe, expect, test} from 'vitest'
import {CreateBrandInput} from "../../../../../src/models/brands/types/CreateBrandInput"
import {sanitize} from "../../../../../src/controllers/brands/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateBrandInput = {
            name: "     BMW     ",
            full_name: "Bayerische Motoren Werke     ",
            founded: 1916,
            defunct: null,
            wmi: "WBA",
            hsn: "    0005",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "BMW",
                full_name: "Bayerische Motoren Werke",
                founded: 1916,
                defunct: null,
                wmi: "WBA",
                hsn: "0005",
            })
    })
})
