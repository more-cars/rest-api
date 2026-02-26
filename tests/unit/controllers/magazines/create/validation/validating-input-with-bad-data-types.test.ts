import {expect, test} from 'vitest'
import {CreateMagazineRawInput} from "../../../../../../src/controllers/node-types/magazines/types/CreateMagazineRawInput"
import {validate} from "../../../../../../src/controllers/node-types/magazines/create"

test.each([
    [true, 1993, 2345, "sports cars", "monthly", 5.99, "£", "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", false, 2345, "sports cars", "monthly", 5.99, "£", "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, false, "sports cars", "monthly", 5.99, "£", "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, false, "monthly", 5.99, "£", "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", false, 5.99, "£", "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", false, "£", "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, false, "print", 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "£", false, 150884, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "£", "print", false, 2013, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "£", "print", 150884, false, "Immediate Media Company", "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "£", "print", 150884, 2013, false, "1350-9624"],
    ["Top Gear", 1993, 2345, "sports cars", "monthly", 5.99, "£", "print", 150884, 2013, "Immediate Media Company", false],

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
) => {
    const data: CreateMagazineRawInput = {
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
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
