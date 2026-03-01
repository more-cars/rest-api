import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazine-issues/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        title: "Performance Car of the Year",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            title: "Performance Car of the Year",
            consecutive_number: undefined,
            issue_number: undefined,
            issue_year: undefined,
            release_date: undefined,
            single_copy_price: undefined,
            single_copy_price_unit: undefined,
            pages: undefined,
        })
})
