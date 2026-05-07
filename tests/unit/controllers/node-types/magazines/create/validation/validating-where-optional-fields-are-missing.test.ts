import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
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
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.Magazine)

    expect(result)
        .toBeTruthy()
})
