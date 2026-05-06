import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        title: "Performance Car of the Year",
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
