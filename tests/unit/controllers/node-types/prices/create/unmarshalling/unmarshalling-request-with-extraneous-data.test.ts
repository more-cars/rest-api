import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        price: 59990,
        price_year: 2020,
        currency_code: "EUR",
        country_code: "DE",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
        'price',
        'price_year',
        'currency_code',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            price: 59990,
            price_year: 2020,
            currency_code: "EUR",
            country_code: "DE",
        })
})
