import {expect, test} from 'vitest'
import {CreateMagazineIssueRawInput} from "../../../../../../src/controllers/node-types/magazine-issues/types/CreateMagazineIssueRawInput"
import {validate} from "../../../../../../src/controllers/node-types/magazine-issues/create"

test('validating a complete and valid request', async () => {
    const data: CreateMagazineIssueRawInput = {
        title: "Performance Car of the Year",
        consecutive_number: 402,
        issue_number: 12,
        issue_year: 2025,
        release_date: "2025-11-26",
        single_copy_price: 5.99,
        single_copy_price_unit: "GBP",
        pages: 156,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
