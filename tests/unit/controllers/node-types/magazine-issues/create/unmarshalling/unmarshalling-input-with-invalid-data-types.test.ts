import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        title: true,
        consecutive_number: true,
        issue_number: true,
        issue_year: true,
        release_date: true,
        single_copy_price: true,
        single_copy_price_unit: true,
        pages: true,
    }

    const result = unmarshalInputData(data, [
        'title',
        'consecutive_number',
        'issue_number',
        'issue_year',
        'release_date',
        'single_copy_price',
        'single_copy_price_unit',
        'pages',
    ])

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
