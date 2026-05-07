import {describe, expect, test} from 'vitest'
import {CreatePriceInput} from "../../../../../../src/models/node-types/prices/types/CreatePriceInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreatePriceInput = {
            price: 59990,
            price_year: 2020,
            currency_code: "   EUR  ",
            country_code: "   DE  ",
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
})
