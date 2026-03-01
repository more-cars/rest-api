import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazine-issues/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        title: true,
        consecutive_number: true,
        issue_number: true,
        issue_year: true,
        release_date: true,
        single_copy_price: true,
        single_copy_price_unit: true,
        pages: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            title: true,
            consecutive_number: true,
            issue_number: true,
            issue_year: true,
            release_date: true,
            single_copy_price: true,
            single_copy_price_unit: true,
            pages: true,
        })
})
