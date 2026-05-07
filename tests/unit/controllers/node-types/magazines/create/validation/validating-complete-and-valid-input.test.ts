import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
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
        country_code: "GB",
    }

    const result = validateInputData(data, NodeType.Magazine)

    expect(result)
        .toBeTruthy()
})
