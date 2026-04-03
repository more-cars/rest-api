import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/magazine-issues/marshalling/unmarshalInputData"
import type {CreateMagazineIssueRawInput} from "../../../../../../../src/controllers/node-types/magazine-issues/types/CreateMagazineIssueRawInput"

test('unmarshalling a complete and valid request', async () => {
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

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            title: "Performance Car of the Year",
            consecutive_number: 402,
            issue_number: 12,
            issue_year: 2025,
            release_date: "2025-11-26",
            single_copy_price: 5.99,
            single_copy_price_unit: "GBP",
            pages: 156,
        })
})
