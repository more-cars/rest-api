import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {}

    const result = unmarshalInputData(data, [
        'price',
        'price_year',
        'currency_code',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            price: undefined,
            price_year: undefined,
            currency_code: undefined,
            country_code: undefined
        })
})
