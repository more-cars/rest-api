import {expect, test} from 'vitest'
import {CreateMagazineRawInput} from "../../../../../../src/controllers/node-types/magazines/types/CreateMagazineRawInput"
import {validate} from "../../../../../../src/controllers/node-types/magazines/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateMagazineRawInput = {
        name: "Top Gear",
        founded: undefined,
        defunct: undefined,
        focus: undefined,
        publication_frequency: undefined,
        single_copy_price: undefined,
        single_copy_price_unit: undefined,
        publication_format: undefined,
        circulation: undefined,
        circulation_year: undefined,
        publisher: undefined,
        issn: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
