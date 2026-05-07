import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        price: true,
        price_year: true,
        currency_code: true,
        country_code: true,
    }

    const result = unmarshalInputData(data, [
        'price',
        'price_year',
        'currency_code',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            price: true,
            price_year: true,
            currency_code: true,
            country_code: true,
        })
})
