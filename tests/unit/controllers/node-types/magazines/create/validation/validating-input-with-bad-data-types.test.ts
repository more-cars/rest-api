import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 1993, 2345, "sports cars", "monthly", 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", false, 2345, "sports cars", "monthly", 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, false, "sports cars", "monthly", 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, false, "monthly", 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", false, 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", false, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, false, "print", 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "GBP", false, 150884, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "GBP", "print", false, 2013, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "GBP", "print", 150884, false, "Immediate Media Company", "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "GBP", "print", 150884, 2013, false, "1350-9624", "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", false, "GB"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "GBP", "print", 150884, 2013, "Immediate Media Company", "1350-9624", false],

])('validating a request where the fields have invalid data types', async (
    name,
    founded,
    defunct,
    focus,
    publication_frequency,
    single_copy_price,
    single_copy_price_unit,
    publication_format,
    circulation,
    circulation_year,
    publisher,
    issn,
    country_code,
) => {
    const data = {
        name,
        founded,
        defunct,
        focus,
        publication_frequency,
        single_copy_price,
        single_copy_price_unit,
        publication_format,
        circulation,
        circulation_year,
        publisher,
        issn,
        country_code,
    }

    const result = validateInputData(data, NodeType.Magazine)

    expect(result)
        .toBeFalsy()
})
