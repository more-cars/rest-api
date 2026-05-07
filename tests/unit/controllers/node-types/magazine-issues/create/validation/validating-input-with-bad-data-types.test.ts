import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 402, 12, 2025, "2025-11-26", 5.99, "GBP", 156],
    ["Performance Car of the Year", true, 12, 2025, "2025-11-26", 5.99, "GBP", 156],
    ["Performance Car of the Year", 402, true, 2025, "2025-11-26", 5.99, "GBP", 156],
    ["Performance Car of the Year", 402, 12, true, "2025-11-26", 5.99, "GBP", 156],
    ["Performance Car of the Year", 402, 12, 2025, true, 5.99, "GBP", 156],
    ["Performance Car of the Year", 402, 12, 2025, "2025-11-26", true, "GBP", 156],
    ["Performance Car of the Year", 402, 12, 2025, "2025-11-26", 5.99, true, 156],
    ["Performance Car of the Year", 402, 12, 2025, "2025-11-26", 5.99, "GBP", true],
])('validating a request where the fields have invalid data types', async (
    title,
    consecutive_number,
    issue_number,
    issue_year,
    release_date,
    single_copy_price,
    single_copy_price_unit,
    pages,
) => {
    const data = {
        title,
        consecutive_number,
        issue_number,
        issue_year,
        release_date,
        single_copy_price,
        single_copy_price_unit,
        pages,
    }

    const result = validateInputData(data, NodeType.MagazineIssue)

    expect(result)
        .toBeFalsy()
})
