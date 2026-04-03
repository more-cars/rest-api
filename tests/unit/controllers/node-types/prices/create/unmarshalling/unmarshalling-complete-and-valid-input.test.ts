import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/prices/marshalling/unmarshalInputData"
import type {CreatePriceRawInput} from "../../../../../../../src/controllers/node-types/prices/types/CreatePriceRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreatePriceRawInput = {
        price: 59990,
        price_year: 2020,
        currency_code: "EUR",
        country_code: "DE",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            price: 59990,
            price_year: 2020,
            currency_code: "EUR",
            country_code: "DE",
        })
})
