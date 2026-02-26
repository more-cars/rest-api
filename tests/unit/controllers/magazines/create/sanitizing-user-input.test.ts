import {describe, expect, test} from 'vitest'
import {CreateMagazineInput} from "../../../../../src/models/node-types/magazines/types/CreateMagazineInput"
import {sanitize} from "../../../../../src/controllers/node-types/magazines/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateMagazineInput = {
            name: "   Top Gear  ",
            founded: 1993,
            defunct: null,
            focus: "   sports cars  ",
            publication_frequency: "   monthly  ",
            single_copy_price: 5.99,
            single_copy_price_unit: "   £  ",
            publication_format: "   print  ",
            circulation: 150884,
            circulation_year: 2013,
            publisher: "   Immediate Media Company  ",
            issn: "   1350-9624  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "Top Gear",
                founded: 1993,
                defunct: null,
                focus: "sports cars",
                publication_frequency: "monthly",
                single_copy_price: 5.99,
                single_copy_price_unit: "£",
                publication_format: "print",
                circulation: 150884,
                circulation_year: 2013,
                publisher: "Immediate Media Company",
                issn: "1350-9624",
            })
    })
})
