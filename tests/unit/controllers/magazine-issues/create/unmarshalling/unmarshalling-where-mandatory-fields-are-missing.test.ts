import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazine-issues/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
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
            title: undefined,
            consecutive_number: 402,
            issue_number: 12,
            issue_year: 2025,
            release_date: "2025-11-26",
            single_copy_price: 5.99,
            single_copy_price_unit: "GBP",
            pages: 156,
        })
})
