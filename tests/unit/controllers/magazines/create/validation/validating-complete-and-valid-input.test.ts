import {expect, test} from 'vitest'
import {CreateMagazineRawInput} from "../../../../../../src/controllers/node-types/magazines/types/CreateMagazineRawInput"
import {validate} from "../../../../../../src/controllers/node-types/magazines/create"

test('validating a complete and valid request', async () => {
    const data: CreateMagazineRawInput = {
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
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
